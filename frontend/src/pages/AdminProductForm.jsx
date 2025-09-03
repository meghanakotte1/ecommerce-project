import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../services/api";

export default function AdminProductForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(!!editing);

  useEffect(() => {
    if (!editing) return;
    (async () => {
      try {
        const list = await apiGet("/api/products");
        const found = list.find(p => String(p.id) === id);
        if (found) setForm({ name: found.name, price: String(found.price), description: found.description || "" });
      } finally {
        setLoading(false);
      }
    })();
  }, [editing, id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price) };
    if (editing) await apiPut(`/api/products/${id}`, payload);
    else await apiPost("/api/products", payload);
    navigate("/products");
  };

  if (loading) return <div className="text-gray-500">Loading…</div>;

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold">{editing ? "Edit" : "Create"} Product</h2>

      <label className="block">
        <span className="text-sm text-gray-600">Name</span>
        <input
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={form.name}
          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Price</span>
        <input
          type="number"
          step="0.01"
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={form.price}
          onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
          required
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Description</span>
        <textarea
          className="mt-1 w-full rounded-xl border px-3 py-2"
          rows={3}
          value={form.description}
          onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
          required
        />
      </label>

      <div className="flex gap-3">
        <button className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          {editing ? "Update" : "Create"}
        </button>
        <button
          type="button"
          className="px-5 py-2 rounded-xl border hover:bg-gray-50"
          onClick={() => navigate("/products")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
