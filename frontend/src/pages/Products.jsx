import { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("/api/products");
      setList(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await apiDelete(`/api/products/${id}`);
    setList(prev => prev.filter(p => p.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
      </div>

      {list.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {list.map(p => (
            <ProductCard key={p.id} product={p} admin onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
