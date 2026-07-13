"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import type { PartnerLeadSubmissionErrors } from "@/src/types/partner-program";

type SubmissionState = {
  ok: boolean;
  message: string;
  fieldErrors: PartnerLeadSubmissionErrors;
};

const initialState: SubmissionState = {
  ok: false,
  message: "",
  fieldErrors: {},
};

export function PartnerLeadSubmissionForm({
  action,
}: {
  action: (
    state: SubmissionState,
    formData: FormData,
  ) => Promise<SubmissionState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  const inputClassName =
    "w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-300 placeholder:text-slate-500 focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30 disabled:cursor-not-allowed disabled:opacity-70";

  const renderError = (field: keyof PartnerLeadSubmissionErrors) =>
    state.fieldErrors[field] ? (
      <p className="text-sm text-rose-300">{state.fieldErrors[field]}</p>
    ) : null;

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium text-slate-200">
            Company name
          </label>
          <input id="companyName" name="companyName" className={inputClassName} />
          {renderError("companyName")}
        </div>

        <div className="space-y-2">
          <label htmlFor="contactName" className="text-sm font-medium text-slate-200">
            Contact person
          </label>
          <input id="contactName" name="contactName" className={inputClassName} />
          {renderError("contactName")}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-200">
            Email
          </label>
          <input id="email" name="email" type="email" className={inputClassName} />
          {renderError("email")}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-slate-200">
            Phone
          </label>
          <input id="phone" name="phone" className={inputClassName} />
          {renderError("phone")}
        </div>

        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium text-slate-200">
            Website
            <span className="ml-1 text-xs font-normal text-slate-500">(Optional)</span>
          </label>
          <input id="website" name="website" type="url" className={inputClassName} />
          {renderError("website")}
        </div>

        <div className="space-y-2">
          <label htmlFor="countryCity" className="text-sm font-medium text-slate-200">
            Country / City
          </label>
          <input id="countryCity" name="countryCity" className={inputClassName} />
          {renderError("countryCity")}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="serviceNeeded" className="text-sm font-medium text-slate-200">
          Service needed
        </label>
        <input id="serviceNeeded" name="serviceNeeded" className={inputClassName} />
        {renderError("serviceNeeded")}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="estimatedBudget" className="text-sm font-medium text-slate-200">
            Estimated budget
          </label>
          <input id="estimatedBudget" name="estimatedBudget" className={inputClassName} />
          {renderError("estimatedBudget")}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="additionalContext" className="text-sm font-medium text-slate-200">
          Additional context / notes
        </label>
        <textarea
          id="additionalContext"
          name="additionalContext"
          rows={5}
          className={inputClassName}
        />
        {renderError("additionalContext")}
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-4">
        <input
          id="consentToShare"
          name="consentToShare"
          type="checkbox"
          className="mt-1 size-4 rounded border-white/10 bg-slate-950/40 text-blue-500 focus:ring-2 focus:ring-blue-400/40"
        />
        <span className="text-sm leading-6 text-slate-300">
          I confirm that I have permission to share these contact details.
        </span>
      </label>
      {renderError("consentToShare")}

      {state.message ? (
        <div
          className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
            state.ok
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/20 bg-rose-400/10 text-rose-100"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Submitting..." : "Submit Lead"}
      </Button>
    </form>
  );
}
