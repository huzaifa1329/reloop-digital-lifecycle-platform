import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Textarea from "../../components/common/Textarea";
import Button from "../../components/common/Button";

import { useData } from "../../context/DataContext";

function RepairNew() {
  const {
    products,
    repairPartners,
    addRepairRequest,
  } = useData();

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const [form, setForm] =
    useState({
      productId:
        searchParams.get(
          "productId",
        ) || "",

      assignedPartnerId:
        searchParams.get(
          "partnerId",
        ) || "",

      issue: "",
      description: "",
      serviceType: "",
      preferredDate: "",
      location: "",
    });

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Automatically select partner if URL contains partnerId
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const partnerId =
      searchParams.get(
        "partnerId",
      );

    if (partnerId) {
      setForm((prev) => ({
        ...prev,
        assignedPartnerId:
          partnerId,
      }));
    }
  }, [searchParams]);

  /*
  |--------------------------------------------------------------------------
  | Change handler
  |--------------------------------------------------------------------------
  */

  function handleChange(e) {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  function validate() {
    const next = {};

    if (!form.productId) {
      next.productId =
        "Select a product.";
    }

    if (
      !form.assignedPartnerId
    ) {
      next.assignedPartnerId =
        "Select a repair partner.";
    }

    if (!form.issue.trim()) {
      next.issue =
        "Describe the issue briefly.";
    }

    if (!form.serviceType) {
      next.serviceType =
        "Select a service type.";
    }

    if (!form.preferredDate) {
      next.preferredDate =
        "Pick a preferred date.";
    }

    setErrors(next);

    return (
      Object.keys(next).length === 0
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const request =
        await addRepairRequest(
          form,
        );

      navigate(
        `/customer/repairs/${request.id}`,
      );
    } catch (error) {
      setErrors({
        submit:
          error.message ||
          "Failed to submit repair request.",
      });
    } finally {
      setLoading(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Only approved partners
  |--------------------------------------------------------------------------
  */

  const approvedPartners =
    repairPartners.filter(
      (partner) =>
        partner.status ===
          "Active" &&
        partner.verificationStatus ===
          "Verified",
    );

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Extend its life"
        title="Request a Repair"
        description="Choose a verified repair partner and tell us what's wrong with your product."
      />

      <Card className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Product */}

          <Select
            id="productId"
            name="productId"
            label="Product"
            value={form.productId}
            onChange={handleChange}
            error={errors.productId}
            options={[
              {
                value: "",
                label:
                  "Select a product",
              },
              ...products.map(
                (product) => ({
                  value:
                    product.id,
                  label: `${product.name} (${product.productId})`,
                }),
              ),
            ]}
          />

          {/* Repair Partner */}

          <Select
            id="assignedPartnerId"
            name="assignedPartnerId"
            label="Repair Partner"
            value={
              form.assignedPartnerId
            }
            onChange={handleChange}
            error={
              errors.assignedPartnerId
            }
            options={[
              {
                value: "",
                label:
                  approvedPartners.length
                    ? "Select a repair partner"
                    : "No verified repair partners available",
              },

              ...approvedPartners.map(
                (partner) => ({
                  value:
                    partner.id,

                  label: `${
                    partner.businessName ||
                    partner.name
                  }${
                    partner.location
                      ? ` — ${partner.location}`
                      : ""
                  }`,
                }),
              ),
            ]}
          />

          {/* Issue */}

          <Input
            id="issue"
            name="issue"
            label="Issue"
            placeholder="e.g. Display flickering"
            value={form.issue}
            onChange={handleChange}
            error={errors.issue}
          />

          {/* Description */}

          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Describe the problem in more detail…"
            value={
              form.description
            }
            onChange={handleChange}
          />

          {/* Service / Date */}

          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              id="serviceType"
              name="serviceType"
              label="Service type"
              value={
                form.serviceType
              }
              onChange={handleChange}
              error={
                errors.serviceType
              }
              options={[
                {
                  value: "",
                  label:
                    "Select a service type",
                },
                {
                  value:
                    "In-store",
                  label:
                    "In-store drop-off",
                },
                {
                  value:
                    "Pickup",
                  label:
                    "Pickup from my location",
                },
              ]}
            />

            <Input
              id="preferredDate"
              name="preferredDate"
              type="date"
              label="Preferred date"
              value={
                form.preferredDate
              }
              onChange={handleChange}
              error={
                errors.preferredDate
              }
            />
          </div>

          {/* Location */}

          <Input
            id="location"
            name="location"
            label="Location"
            placeholder="City / area"
            value={
              form.location
            }
            onChange={handleChange}
          />

          {/* Submit Error */}

          {errors.submit && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errors.submit}
            </p>
          )}

          {/* Submit */}

          <Button
            type="submit"
            loading={loading}
            disabled={
              approvedPartners.length ===
              0
            }
          >
            Submit Repair Request
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}

export default RepairNew;