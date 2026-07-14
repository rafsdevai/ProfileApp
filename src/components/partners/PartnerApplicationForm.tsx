"use client";

import {
  useEffect,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  companyOptions,
  partnerApplicationInitialValues,
  partnerIndustryOptions,
  partnerRoleOptions,
  referralPotentialOptions,
  referralSourceOptions,
  validatePartnerApplication,
} from "@/src/lib/partners";
import type {
  PartnerApplicationData,
  PartnerApplicationErrors,
} from "@/src/types/partner-application";

type SubmitState = "idle" | "loading" | "success" | "error";

function FieldWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="space-y-2.5">{children}</div>;
}

function FieldLabel({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-200">
      {label}
      {optional ? (
        <span className="ml-1 text-xs font-normal text-slate-500">(Optional)</span>
      ) : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-xl border border-white/[0.08] bg-slate-950/45 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-300 placeholder:text-slate-500 focus:border-blue-300/28 focus:ring-2 focus:ring-blue-400/30 disabled:cursor-not-allowed disabled:opacity-70";

const selectClassName = `${inputClassName} partner-select`;

export function PartnerApplicationForm() {
  const formId = useId();
  const [values, setValues] = useState<PartnerApplicationData>(
    partnerApplicationInitialValues,
  );
  const [errors, setErrors] = useState<PartnerApplicationErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const isSubmitting = submitState === "loading";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isSuccessDialogOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSuccessDialogOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSuccessDialogOpen]);

  const statusToneClass = useMemo(() => {
    if (submitState === "success") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
    }

    if (submitState === "error") {
      return "border-rose-400/20 bg-rose-400/10 text-rose-100";
    }

    return "";
  }, [submitState]);

  const setFieldValue = <K extends keyof PartnerApplicationData>(
    field: K,
    value: PartnerApplicationData[K],
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleInputChange =
    (field: keyof PartnerApplicationData) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const target = event.currentTarget;
      const value =
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value;

      setFieldValue(field, value as PartnerApplicationData[typeof field]);
    };

  const handleIndustryChange = (industry: (typeof partnerIndustryOptions)[number]) => {
    setValues((current) => {
      const exists = current.industries.includes(industry);
      const nextIndustries = exists
        ? current.industries.filter((item) => item !== industry)
        : [...current.industries, industry];

      return {
        ...current,
        industries: nextIndustries,
      };
    });

    setErrors((current) => ({
      ...current,
      industries: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validatePartnerApplication(values);

    if (Object.keys(validation.errors).length > 0) {
      setErrors(validation.errors);
      setSubmitState("error");
      setSubmitMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.values),
      });

      const payload = (await response.json()) as {
        message?: string;
        fieldErrors?: PartnerApplicationErrors;
      };

      if (!response.ok) {
        setErrors(payload.fieldErrors ?? {});
        setSubmitState("error");
        setSubmitMessage(
          payload.message ??
            "We couldn't submit your application right now. Please try again.",
        );
        return;
      }

      setValues(partnerApplicationInitialValues);
      setErrors({});
      setSubmitState("success");
      setSubmitMessage(
        payload.message ??
          "Application sent successfully. We'll get back to you within 2 business days.",
      );
      setIsSuccessDialogOpen(true);
    } catch {
      setSubmitState("error");
      setSubmitMessage(
        "Something went wrong while sending the application. Please try again later.",
      );
    }
  };

  const errorId = (field: keyof PartnerApplicationData) =>
    `${formId}-${field}-error`;

  const successDialog =
    isMounted && isSuccessDialogOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,6,23,0.78)] p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${formId}-success-dialog-title`}
            aria-describedby={`${formId}-success-dialog-description`}
            onClick={() => setIsSuccessDialogOpen(false)}
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.96),rgba(7,11,21,0.92))] p-6 shadow-[0_30px_80px_rgba(2,6,23,0.55)] sm:p-7"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsSuccessDialogOpen(false)}
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white transition duration-300 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Close confirmation dialog"
              >
                <X className="size-4.5" aria-hidden="true" />
              </button>

              <div className="pr-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                  Application sent
                </p>
                <h3
                  id={`${formId}-success-dialog-title`}
                  className="mt-3 text-2xl font-semibold text-white"
                >
                  Check your inbox and Spam folder
                </h3>
                <p
                  id={`${formId}-success-dialog-description`}
                  className="mt-4 text-sm leading-7 text-slate-300"
                >
                  We&apos;ll send the confirmation email after your application is accepted.
                  If you don&apos;t see it in your inbox, please also check the
                  <span className="mx-1 rounded bg-white/[0.08] px-2 py-0.5 text-white">
                    Spam
                  </span>
                  folder.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={() => setIsSuccessDialogOpen(false)}>
                  Understood
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <Reveal delay={0.08}>
        <div
          id="partner-application"
          className="scroll-mt-28 rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.84),rgba(6,10,20,0.7))] p-5 shadow-[0_24px_90px_rgba(2,6,23,0.32)] backdrop-blur-2xl sm:p-7 lg:p-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-[1.65rem] font-bold text-white sm:text-[2rem]">
              Apply to become a partner
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
              Fill out the form below and we&apos;ll get in touch with you within 2
              business days.
            </p>
          </div>

        <form className="mt-7 space-y-7 sm:mt-8 sm:space-y-8" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <FieldWrapper>
              <FieldLabel htmlFor={`${formId}-fullName`} label="Full Name" />
              <input
                id={`${formId}-fullName`}
                name="fullName"
                type="text"
                value={values.fullName}
                onChange={handleInputChange("fullName")}
                className={inputClassName}
                autoComplete="name"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? errorId("fullName") : undefined}
              />
              {errors.fullName ? (
                <p id={errorId("fullName")} className="text-sm text-rose-300">
                  {errors.fullName}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel htmlFor={`${formId}-email`} label="Email" />
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                value={values.email}
                onChange={handleInputChange("email")}
                className={inputClassName}
                autoComplete="email"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? errorId("email") : undefined}
              />
              {errors.email ? (
                <p id={errorId("email")} className="text-sm text-rose-300">
                  {errors.email}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-phone`}
                label="Phone / WhatsApp"
              />
              <input
                id={`${formId}-phone`}
                name="phone"
                type="text"
                value={values.phone}
                onChange={handleInputChange("phone")}
                className={inputClassName}
                autoComplete="tel"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? errorId("phone") : undefined}
              />
              {errors.phone ? (
                <p id={errorId("phone")} className="text-sm text-rose-300">
                  {errors.phone}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-location`}
                label="Country / City"
              />
              <input
                id={`${formId}-location`}
                name="location"
                type="text"
                value={values.location}
                onChange={handleInputChange("location")}
                className={inputClassName}
                autoComplete="address-level2"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? errorId("location") : undefined}
              />
              {errors.location ? (
                <p id={errorId("location")} className="text-sm text-rose-300">
                  {errors.location}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-bestDescribesYou`}
                label="What best describes you?"
              />
              <select
                id={`${formId}-bestDescribesYou`}
                name="bestDescribesYou"
                value={values.bestDescribesYou}
                onChange={handleInputChange("bestDescribesYou")}
                className={selectClassName}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.bestDescribesYou)}
                aria-describedby={
                  errors.bestDescribesYou
                    ? errorId("bestDescribesYou")
                    : undefined
                }
              >
                <option value="">Select an option</option>
                {partnerRoleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.bestDescribesYou ? (
                <p
                  id={errorId("bestDescribesYou")}
                  className="text-sm text-rose-300"
                >
                  {errors.bestDescribesYou}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-companyStatus`}
                label="Do you have a company?"
              />
              <select
                id={`${formId}-companyStatus`}
                name="companyStatus"
                value={values.companyStatus}
                onChange={handleInputChange("companyStatus")}
                className={selectClassName}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.companyStatus)}
                aria-describedby={
                  errors.companyStatus ? errorId("companyStatus") : undefined
                }
              >
                <option value="">Select an option</option>
                {companyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.companyStatus ? (
                <p id={errorId("companyStatus")} className="text-sm text-rose-300">
                  {errors.companyStatus}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-heardAboutProgram`}
                label="How did you hear about our Partner Program?"
              />
              <select
                id={`${formId}-heardAboutProgram`}
                name="heardAboutProgram"
                value={values.heardAboutProgram}
                onChange={handleInputChange("heardAboutProgram")}
                className={selectClassName}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.heardAboutProgram)}
                aria-describedby={
                  errors.heardAboutProgram
                    ? errorId("heardAboutProgram")
                    : undefined
                }
              >
                <option value="">Select an option</option>
                {referralSourceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.heardAboutProgram ? (
                <p
                  id={errorId("heardAboutProgram")}
                  className="text-sm text-rose-300"
                >
                  {errors.heardAboutProgram}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-potentialClients`}
                label="How many potential clients do you think you can refer in the next 3 months?"
              />
              <select
                id={`${formId}-potentialClients`}
                name="potentialClients"
                value={values.potentialClients}
                onChange={handleInputChange("potentialClients")}
                className={selectClassName}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.potentialClients)}
                aria-describedby={
                  errors.potentialClients
                    ? errorId("potentialClients")
                    : undefined
                }
              >
                <option value="">Select an option</option>
                {referralPotentialOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.potentialClients ? (
                <p
                  id={errorId("potentialClients")}
                  className="text-sm text-rose-300"
                >
                  {errors.potentialClients}
                </p>
              ) : null}
            </FieldWrapper>
          </div>

          <FieldWrapper>
            <span className="text-sm font-medium text-slate-200">
              In which industries do you have contacts?
            </span>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {partnerIndustryOptions.map((industry) => {
                const checked = values.industries.includes(industry);

                return (
                  <label
                    key={industry}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm text-slate-300 transition duration-300 hover:border-blue-300/16 hover:bg-blue-400/[0.04]"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleIndustryChange(industry)}
                      disabled={isSubmitting}
                      className="size-4 rounded border-white/10 bg-slate-950/40 text-blue-500 focus:ring-2 focus:ring-blue-400/40"
                    />
                    <span>{industry}</span>
                  </label>
                );
              })}
            </div>
            {errors.industries ? (
              <p id={errorId("industries")} className="text-sm text-rose-300">
                {errors.industries}
              </p>
            ) : null}
          </FieldWrapper>

          <FieldWrapper>
            <FieldLabel
              htmlFor={`${formId}-clientAcquisitionPlan`}
              label="How do you plan to bring us clients?"
            />
            <textarea
              id={`${formId}-clientAcquisitionPlan`}
              name="clientAcquisitionPlan"
              rows={5}
              value={values.clientAcquisitionPlan}
              onChange={handleInputChange("clientAcquisitionPlan")}
              className={inputClassName}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.clientAcquisitionPlan)}
              aria-describedby={
                errors.clientAcquisitionPlan
                  ? errorId("clientAcquisitionPlan")
                  : undefined
              }
            />
            {errors.clientAcquisitionPlan ? (
              <p
                id={errorId("clientAcquisitionPlan")}
                className="text-sm text-rose-300"
              >
                {errors.clientAcquisitionPlan}
              </p>
            ) : null}
          </FieldWrapper>

          <div className="grid gap-5 md:grid-cols-2">
            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-linkedInUrl`}
                label="LinkedIn profile URL"
                optional
              />
              <input
                id={`${formId}-linkedInUrl`}
                type="url"
                value={values.linkedInUrl}
                onChange={handleInputChange("linkedInUrl")}
                className={inputClassName}
                autoComplete="url"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.linkedInUrl)}
                aria-describedby={
                  errors.linkedInUrl ? errorId("linkedInUrl") : undefined
                }
              />
              {errors.linkedInUrl ? (
                <p id={errorId("linkedInUrl")} className="text-sm text-rose-300">
                  {errors.linkedInUrl}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-instagramUrl`}
                label="Instagram profile URL"
                optional
              />
              <input
                id={`${formId}-instagramUrl`}
                type="url"
                value={values.instagramUrl}
                onChange={handleInputChange("instagramUrl")}
                className={inputClassName}
                autoComplete="url"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.instagramUrl)}
                aria-describedby={
                  errors.instagramUrl ? errorId("instagramUrl") : undefined
                }
              />
              {errors.instagramUrl ? (
                <p
                  id={errorId("instagramUrl")}
                  className="text-sm text-rose-300"
                >
                  {errors.instagramUrl}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-facebookUrl`}
                label="Facebook page/profile URL"
                optional
              />
              <input
                id={`${formId}-facebookUrl`}
                type="url"
                value={values.facebookUrl}
                onChange={handleInputChange("facebookUrl")}
                className={inputClassName}
                autoComplete="url"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.facebookUrl)}
                aria-describedby={
                  errors.facebookUrl ? errorId("facebookUrl") : undefined
                }
              />
              {errors.facebookUrl ? (
                <p
                  id={errorId("facebookUrl")}
                  className="text-sm text-rose-300"
                >
                  {errors.facebookUrl}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-youtubeUrl`}
                label="YouTube channel URL"
                optional
              />
              <input
                id={`${formId}-youtubeUrl`}
                type="url"
                value={values.youtubeUrl}
                onChange={handleInputChange("youtubeUrl")}
                className={inputClassName}
                autoComplete="url"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.youtubeUrl)}
                aria-describedby={
                  errors.youtubeUrl ? errorId("youtubeUrl") : undefined
                }
              />
              {errors.youtubeUrl ? (
                <p id={errorId("youtubeUrl")} className="text-sm text-rose-300">
                  {errors.youtubeUrl}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-tiktokUrl`}
                label="TikTok profile URL"
                optional
              />
              <input
                id={`${formId}-tiktokUrl`}
                type="url"
                value={values.tiktokUrl}
                onChange={handleInputChange("tiktokUrl")}
                className={inputClassName}
                autoComplete="url"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.tiktokUrl)}
                aria-describedby={
                  errors.tiktokUrl ? errorId("tiktokUrl") : undefined
                }
              />
              {errors.tiktokUrl ? (
                <p id={errorId("tiktokUrl")} className="text-sm text-rose-300">
                  {errors.tiktokUrl}
                </p>
              ) : null}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel
                htmlFor={`${formId}-xUrl`}
                label="X (Twitter) profile URL"
                optional
              />
              <input
                id={`${formId}-xUrl`}
                type="url"
                value={values.xUrl}
                onChange={handleInputChange("xUrl")}
                className={inputClassName}
                autoComplete="url"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.xUrl)}
                aria-describedby={errors.xUrl ? errorId("xUrl") : undefined}
              />
              {errors.xUrl ? (
                <p id={errorId("xUrl")} className="text-sm text-rose-300">
                  {errors.xUrl}
                </p>
              ) : null}
            </FieldWrapper>

            <div className="md:col-span-2">
              <FieldWrapper>
                <FieldLabel
                  htmlFor={`${formId}-websiteUrl`}
                  label="Website URL or other relevant platform"
                  optional
                />
                <input
                  id={`${formId}-websiteUrl`}
                  type="url"
                  value={values.websiteUrl}
                  onChange={handleInputChange("websiteUrl")}
                  className={inputClassName}
                  autoComplete="url"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.websiteUrl)}
                  aria-describedby={
                    errors.websiteUrl ? errorId("websiteUrl") : undefined
                  }
                />
                {errors.websiteUrl ? (
                  <p id={errorId("websiteUrl")} className="text-sm text-rose-300">
                    {errors.websiteUrl}
                  </p>
                ) : null}
              </FieldWrapper>
            </div>
          </div>

          <FieldWrapper>
            <FieldLabel
              htmlFor={`${formId}-additionalNotes`}
              label="Anything else we should know?"
              optional
            />
            <textarea
              id={`${formId}-additionalNotes`}
              name="additionalNotes"
              rows={5}
              value={values.additionalNotes}
              onChange={handleInputChange("additionalNotes")}
              className={inputClassName}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.additionalNotes)}
              aria-describedby={
                errors.additionalNotes ? errorId("additionalNotes") : undefined
              }
            />
            {errors.additionalNotes ? (
              <p
                id={errorId("additionalNotes")}
                className="text-sm text-rose-300"
              >
                {errors.additionalNotes}
              </p>
            ) : null}
          </FieldWrapper>

          <FieldWrapper>
            <label className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-4">
              <input
                id={`${formId}-agreement`}
                type="checkbox"
                checked={values.agreement}
                onChange={handleInputChange("agreement")}
                disabled={isSubmitting}
                className="mt-1 size-4 rounded border-white/10 bg-slate-950/40 text-blue-500 focus:ring-2 focus:ring-blue-400/40"
                aria-invalid={Boolean(errors.agreement)}
                aria-describedby={errors.agreement ? errorId("agreement") : undefined}
              />
              <span className="text-sm leading-6 text-slate-300">
                I agree that my data will be used for the purpose of the Partner
                Program.
              </span>
            </label>
            {errors.agreement ? (
              <p id={errorId("agreement")} className="text-sm text-rose-300">
                {errors.agreement}
              </p>
            ) : null}
          </FieldWrapper>

          {submitMessage ? (
            <div className={`rounded-xl border px-4 py-3 text-sm leading-6 ${statusToneClass}`}>
              {submitMessage}
            </div>
          ) : null}

          <div className="space-y-3">
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
            <p className="text-sm text-slate-500">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </form>
      </div>
      </Reveal>
      {successDialog}
    </>
  );
}
