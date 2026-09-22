"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductForm } from "@/hooks/use-product-form";
import { createProductSchema, type ProductFormValues } from "@/schemas/create-product";
import type { Product } from "@/types/product";
import { centsToInput, grossFromNet, netFromGross, parseMoneyToCents } from "@/utils/price";

import { FirstStepInformation } from "./first-step-information";
import { SecondStepPricing } from "./second-step-pricing";
import { StepIndicator } from "./step-indicator";
import { ThirdStepAvailability } from "./third-step-availability";

type Props = {
  onClose: () => void;
  onSave: (product: Product) => void;
};

export const CreateProductDialog = ({ onClose, onSave }: Props) => {
  const [step, setStep] = useState(0);
  const [attempted, setAttempted] = useState([false, false, false]);

  const saveProduct = (values: ProductFormValues) => {
    const value = createProductSchema.parse(values);
    const netPriceCents = parseMoneyToCents(value.netPrice);
    const grossPriceCents = parseMoneyToCents(value.grossPrice);
    if (netPriceCents === null || grossPriceCents === null) return;

    onSave({
      id: crypto.randomUUID(),
      name: value.name,
      sku: value.sku,
      description: value.description,
      manufacturer: value.manufacturer,
      category: value.category,
      features: value.features,
      netPriceCents,
      grossPriceCents,
      vatRate: value.vatRate,
      currency: value.currency,
      isAvailable: value.isAvailable,
      isLimited: value.isLimited,
      stockQuantity: value.isLimited ? Number(value.stockQuantity) : null,
      minQuantity: Number(value.minQuantity),
      maxQuantity: Number(value.maxQuantity),
    });
  };

  const form = useProductForm(step, (values) => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      saveProduct(values);
    }
  });

  const recalculatePrice = (source: "netPrice" | "grossPrice", value: string, vatRate: number) => {
    const cents = parseMoneyToCents(value);
    if (cents === null) return;

    const calculatedCents =
      source === "netPrice" ? grossFromNet(cents, vatRate) : netFromGross(cents, vatRate);
    if (!Number.isSafeInteger(calculatedCents)) return;

    const target = source === "netPrice" ? "grossPrice" : "netPrice";
    form.setFieldValue(target, centsToInput(calculatedCents));
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
    await form.validate("submit");
    await form.handleSubmit();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="top-0 left-0 flex h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none bg-white p-0 sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100dvh-32px)] sm:w-[calc(100vw-32px)] sm:max-w-[720px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[14px]"
        showCloseButton={false}
      >
        <DialogHeader className="flex min-h-[56px] flex-row items-center justify-between px-4 sm:min-h-[64px]">
          <DialogTitle>Dodaj nowy produkt</DialogTitle>
          <DialogDescription className="sr-only">Dodaj nowy produkt</DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Zamknij formularz"
              className="-mr-2"
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <StepIndicator currentStep={step} />

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            continueForm();
          }}
          noValidate
        >
          <div className="flex-1 overflow-y-auto px-4 py-5">
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

          <div className="flex min-h-[68px] items-center justify-between border-t border-border bg-background px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:pb-3">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="h-9 rounded-full px-3"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Wstecz
              </Button>
            ) : (
              <span />
            )}
            <Button
              type="submit"
              className="h-9 rounded-full bg-blue-600 px-4 text-sm leading-5 font-normal text-white hover:bg-blue-700"
            >
              {step === 2 ? "Zapisz produkt" : "Dalej"}
              {step < 2 && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
