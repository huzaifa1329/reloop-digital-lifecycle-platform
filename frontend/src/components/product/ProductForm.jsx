import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import ImageUpload from "./ImageUpload";
import { categories, conditions } from "../../data/mockData";

function ProductForm({ initialValues, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    category: "",
    purchaseDate: "",
    condition: "",
    estimatedValue: "",
    serialNumber: "",
    notes: "",
    imageUrl: "",
    ...initialValues,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(dataUrl) {
    setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Product name is required.";
    if (!form.category) next.category = "Select a category.";
    if (!form.condition) next.condition = "Select a condition.";
    if (!form.purchaseDate) next.purchaseDate = "Purchase date is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(form);
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ImageUpload value={form.imageUrl} onChange={handleImageChange} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Product name"
          placeholder="Dell XPS 15"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          id="brand"
          name="brand"
          label="Brand"
          placeholder="Dell"
          value={form.brand}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="model"
          name="model"
          label="Model"
          placeholder="XPS 15 9530"
          value={form.model}
          onChange={handleChange}
        />

        <Select
          id="category"
          name="category"
          label="Category"
          value={form.category}
          onChange={handleChange}
          error={errors.category}
          options={categories.map((c) => ({ value: c, label: c }))}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="purchaseDate"
          name="purchaseDate"
          type="date"
          label="Purchase date"
          value={form.purchaseDate}
          onChange={handleChange}
          error={errors.purchaseDate}
        />

        <Select
          id="condition"
          name="condition"
          label="Current condition"
          value={form.condition}
          onChange={handleChange}
          error={errors.condition}
          options={conditions.map((c) => ({ value: c, label: c }))}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="estimatedValue"
          name="estimatedValue"
          type="number"
          label="Estimated value (PKR)"
          placeholder="185000"
          value={form.estimatedValue}
          onChange={handleChange}
        />

        <Input
          id="serialNumber"
          name="serialNumber"
          label="Serial number"
          placeholder="Optional"
          value={form.serialNumber}
          onChange={handleChange}
        />
      </div>

      <Textarea
        id="notes"
        name="notes"
        label="Notes"
        placeholder="Anything worth remembering about this product…"
        value={form.notes}
        onChange={handleChange}
      />

      <Button type="submit" loading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}

export default ProductForm;
