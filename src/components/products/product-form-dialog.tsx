"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StepIndicator } from "@/components/ui/step-indicator";
import { useProductForm } from "@/hooks/use-product-form";
import type { ProductFormData } from "@/schemas/create-product";
import type { Product } from "@/types/product";
import { centsToInput, grossFromNet, netFromGross, parseMoneyToCents } from "@/utils/price";

import { FirstStepInformation } from "./first-step-information";
import { SecondStepPricing } from "./second-step-pricing";
import { ThirdStepAvailability } from "./third-step-availability";

type Props = {
  product?: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
};

export const ProductFormDialog = ({ product, onClose, onSave }: Props) => {
  const locale = useLocale();
  const t = useTranslations("form");
  const steps = [
    { title: t("information"), description: t("basicData") },
    { title: t("price"), description: t("priceData") },
    { title: t("availability"), description: t("stockData") },
  ];
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [attempted, setAttempted] = useState([false, false, false]);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);

  useEffect(() => {
    if (step === previousStep.current) return;
    previousStep.current = step;
    headingRef.current?.focus();
  }, [step]);

  const saveProduct = (values: ProductFormData) => {
    const netPriceCents = parseMoneyToCents(values.netPrice);
    const grossPriceCents = parseMoneyToCents(values.grossPrice);
    if (netPriceCents === null || grossPriceCents === null) return;

    onSave({
      id: product?.id ?? crypto.randomUUID(),
      name: values.name,
      sku: values.sku,
      description: values.description,
      manufacturer: values.manufacturer,
      category: values.category,
      features: values.features,
      netPriceCents,
      grossPriceCents,
      vatRate: values.vatRate,
      currency: values.currency,
      isAvailable: values.isAvailable,
      isLimited: values.isLimited,
      stockQuantity: values.isLimited ? Number(values.stockQuantity) : null,
      minQuantity: Number(values.minQuantity),
      maxQuantity: Number(values.maxQuantity),
    });
  };

  const form = useProductForm(
    step,
    () => {
      setDirection("forward");
      setStep(step + 1);
    },
    saveProduct,
    product,
  );

  const recalculatePrice = (source: "netPrice" | "grossPrice", value: string, vatRate: number) => {
    const cents = parseMoneyToCents(value);
    if (cents === null) return;

    const calculatedCents =
      source === "netPrice" ? grossFromNet(cents, vatRate) : netFromGross(cents, vatRate);
    if (!Number.isSafeInteger(calculatedCents)) return;

    const target = source === "netPrice" ? "grossPrice" : "netPrice";
    form.setFieldValue(target, centsToInput(calculatedCents, locale));
  };

  const changePrice = (field: "netPrice" | "grossPrice", rawValue: string) => {
    form.setFieldValue("priceSource", field);
    form.setFieldValue(field, rawValue);
    recalculatePrice(field, rawValue, form.state.values.vatRate);
  };

  const changeVat = (vatRate: number) => {
    form.setFieldValue("vatRate", vatRate);

    const source = form.state.values.priceSource;
    recalculatePrice(source, form.state.values[source], vatRate);
  };

  const continueForm = async () => {
    setAttempted((current) => current.map((value, index) => (index === step ? true : value)));
    await form.handleSubmit();
    if (!form.state.isValid) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="top-0 left-0 flex h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none bg-white p-0 sm:top-1/2 sm:left-1/2 sm:h-[544px] sm:max-h-[calc(100dvh-32px)] sm:w-[calc(100vw-32px)] sm:max-w-[720px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[14px]"
        showCloseButton={false}
      >
        <DialogHeader className="flex min-h-[56px] flex-row items-center justify-between px-4 sm:min-h-[64px]">
          <DialogTitle>{product ? t("editTitle") : t("addTitle")}</DialogTitle>
          <DialogDescription className="sr-only">
            {product ? t("editTitle") : t("addTitle")}
          </DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={t("close")}
              className="-mr-2"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <StepIndicator steps={steps} currentStep={step} />

        <form
          ref={formRef}
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            void continueForm();
          }}
          noValidate
        >
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
            <div
              key={step}
              className={`motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200 ${direction === "forward" ? "motion-safe:slide-in-from-right-2" : "motion-safe:slide-in-from-left-2"}`}
            >
              <h2 ref={headingRef} tabIndex={-1} className="sr-only">
                {t("step")} {step + 1} {t("of")} {steps.length}: {steps[step]?.title}
              </h2>
              {step === 0 ? (
                <FirstStepInformation form={form} showAllErrors={attempted[0] === true} />
              ) : step === 1 ? (
                <SecondStepPricing
                  form={form}
                  showAllErrors={attempted[1] === true}
                  onPriceChange={changePrice}
                  onVatChange={changeVat}
                />
              ) : (
                <ThirdStepAvailability form={form} showAllErrors={attempted[2] === true} />
              )}
            </div>
          </div>

          <div className="flex min-h-[68px] items-center justify-between border-t border-border bg-background px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:pb-3">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDirection("back");
                  setStep(step - 1);
                }}
                className="h-9 rounded-full px-3"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                {t("back")}
              </Button>
            ) : (
              <span />
            )}
            <Button
              type="submit"
              className="h-9 rounded-full bg-blue-600 px-4 text-sm leading-5 font-normal text-white hover:bg-blue-700"
            >
              {step === 2 ? (product ? t("saveChanges") : t("saveProduct")) : t("next")}
              {step < 2 && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
