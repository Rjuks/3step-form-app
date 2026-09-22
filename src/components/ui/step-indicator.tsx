import { Check } from "lucide-react";

type Props = {
  steps: readonly { title: string; description: string }[];
  currentStep: number;
};

export const StepIndicator = ({ steps, currentStep }: Props) => {
  return (
    <ol className="mx-4 flex gap-2 border-y border-border py-6 sm:mx-0 sm:items-center sm:gap-4 sm:px-4 sm:py-3">
      {steps.map((step, index) => (
        <li
          key={index}
          className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:text-left md:flex-none md:gap-4"
        >
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row sm:items-center md:flex-none">
            <span
              aria-current={index === currentStep ? "step" : undefined}
              className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-medium transition-colors duration-200 motion-reduce:transition-none ${
                index <= currentStep
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-border bg-accent text-muted-foreground"
              }`}
            >
              <span
                aria-hidden={index < currentStep}
                className={`col-start-1 row-start-1 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${index < currentStep ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
              >
                {index + 1}
              </span>
              <Check
                aria-hidden="true"
                className={`col-start-1 row-start-1 size-4 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${index < currentStep ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
              />
            </span>
            <span
              className={`flex min-w-0 flex-col gap-0.5 ${index > currentStep ? "text-muted-foreground" : ""}`}
            >
              <span className="block truncate text-sm font-normal leading-5">{step.title}</span>
              <span className="block text-xs leading-4 text-muted-foreground">
                {step.description}
              </span>
            </span>
          </div>
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="hidden h-px w-12 shrink-0 bg-border sm:block md:w-16"
            >
              <span
                className={`block h-full w-full origin-left bg-blue-600 transition-transform duration-300 ease-out motion-reduce:transition-none ${index < currentStep ? "scale-x-100" : "scale-x-0"}`}
              />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};
