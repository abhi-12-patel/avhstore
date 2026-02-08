"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Plus, Trash2, Pencil } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductImageSlider from '@/components/product/ProductImageSlider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const {
    products,
    reviews,
    addProduct,
    updateProduct,
    deleteProduct,
    loadProducts,
    categories,
    materials,
    stones,
    setCatalog,
  } = useProductStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    shortDescription: '',
    category: '' as Product['category'] | '',
    material: '' as Product['material'] | '',
    stone: '' as Product['stone'] | '',
    sizes: [] as string[],
    inStock: true,
    isNew: false,
    isBestseller: false,
  });

  const [images, setImages] = useState<string[]>([]);
  const [newSize, setNewSize] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize],
      }));
      setNewSize('');
    }
  };

  const removeSize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      shortDescription: '',
      category: '',
      material: '',
      stone: '',
      sizes: [],
      inStock: true,
      isNew: false,
      isBestseller: false,
    });
    setImages([]);
    setNewSize('');
    setEditingId(null);
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category,
      material: product.material,
      stone: product.stone ?? '',
      sizes: product.sizes ?? [],
      inStock: product.inStock,
      isNew: !!product.isNew,
      isBestseller: !!product.isBestseller,
    });
    setImages(product.images ?? []);
    setNewSize('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.material) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: 'No images',
        description: 'Please add at least one product image.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingId) {
        const existing = products.find((product) => product.id === editingId);
        await updateProduct(editingId, {
          name: formData.name,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          description: formData.description,
          shortDescription: formData.shortDescription,
          images: images,
          category: formData.category as Product['category'],
          material: formData.material as Product['material'],
          stone: (formData.stone as Product['stone']) || undefined,
          sizes: formData.sizes.length > 0 ? formData.sizes : undefined,
          inStock: formData.inStock,
          isNew: formData.isNew,
          isBestseller: formData.isBestseller,
          rating: existing?.rating ?? 5.0,
          reviewCount: existing?.reviewCount ?? 0,
        });
        toast({
          title: 'Product updated!',
          description: `${formData.name} has been updated.`,
        });
        resetForm();
        return;
      }

      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        description: formData.description,
        shortDescription: formData.shortDescription,
        images: images,
        category: formData.category as Product['category'],
        material: formData.material as Product['material'],
        stone: (formData.stone as Product['stone']) || undefined,
        sizes: formData.sizes.length > 0 ? formData.sizes : undefined,
        inStock: formData.inStock,
        isNew: formData.isNew,
        isBestseller: formData.isBestseller,
        rating: 5.0,
        reviewCount: 0,
      };

      await addProduct(newProduct);

      toast({
        title: 'Product added!',
        description: `${formData.name} has been added to the catalog.`,
      });

      resetForm();
    } catch (error) {
      console.error('Save failed:', error);
      toast({
        title: 'Save failed',
        description: 'Please make sure json-server is running.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: 'Product deleted',
        description: `${name} has been removed.`,
      });
    } catch (error) {
      console.error('Delete failed:', error);
      toast({
        title: 'Delete failed',
        description: 'Please make sure json-server is running.',
        variant: 'destructive',
      });
    }
  };

  const handleExportCatalog = () => {
    fetch(`${apiBaseUrl}/db`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((catalog) => {
        const blob = new Blob([JSON.stringify(catalog, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'db.json';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        const fallback = {
          products,
          reviews,
          categories,
          materials,
          stones,
        };
        const blob = new Blob([JSON.stringify(fallback, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'db.json';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      });
  };

  const handleImportCatalog = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!parsed || !Array.isArray(parsed.products)) {
          throw new Error('Invalid catalog format.');
        }
        const nextCatalog = {
          products: parsed.products,
          reviews: Array.isArray(parsed.reviews) ? parsed.reviews : reviews,
          categories: Array.isArray(parsed.categories) ? parsed.categories : categories,
          materials: Array.isArray(parsed.materials) ? parsed.materials : materials,
          stones: Array.isArray(parsed.stones) ? parsed.stones : stones,
        };

        const replaceCollection = async (resource: string, items: Array<{ id: string }>) => {
          const existingRes = await fetch(`${apiBaseUrl}/${resource}`);
          if (!existingRes.ok) {
            throw new Error(`Failed to load ${resource}.`);
          }
          const existing = await existingRes.json();
          await Promise.all(
            existing.map((item: { id: string }) =>
              fetch(`${apiBaseUrl}/${resource}/${item.id}`, { method: 'DELETE' })
            )
          );
          await Promise.all(
            items.map((item) =>
              fetch(`${apiBaseUrl}/${resource}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
              })
            )
          );
        };

        Promise.all([
          replaceCollection('products', nextCatalog.products),
          replaceCollection('reviews', nextCatalog.reviews),
          replaceCollection('categories', nextCatalog.categories),
          replaceCollection('materials', nextCatalog.materials),
          replaceCollection('stones', nextCatalog.stones),
        ])
          .then(() => loadProducts())
          .then(() => {
            toast({
              title: 'Catalog imported',
              description: `Loaded ${parsed.products.length} products.`,
            });
            resetForm();
          })
          .catch((error) => {
            console.error('Import failed:', error);
            setCatalog(nextCatalog);
            toast({
              title: 'Import partially applied',
              description: 'Loaded locally. Start json-server to persist.',
              variant: 'destructive',
            });
          });
      } catch (error) {
        console.error('Import failed:', error);
        toast({
          title: 'Import failed',
          description: 'Please select a valid products.json file.',
          variant: 'destructive',
        });
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 font-body text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl text-foreground mb-8">
              Admin Panel
            </h1>

            {/* Catalog Tools */}
            <div className="bg-card border border-border rounded-lg p-6 mb-10">
              <h2 className="font-display text-2xl text-foreground mb-4">
                Catalog Tools
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Export your current catalog or import a products.json file to update it.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={handleExportCatalog}>
                  Download products.json
                </Button>
                <Button type="button" onClick={() => jsonInputRef.current?.click()}>
                  Import products.json
                </Button>
                <input
                  ref={jsonInputRef}
                  type="file"
                  accept="application/json"
                  onChange={handleImportCatalog}
                  className="hidden"
                />
              </div>
            </div>

            {/* Add Product Form */}
            <div className="bg-card border border-border rounded-lg p-8 mb-12">
              <h2 className="font-display text-2xl text-foreground mb-6">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <Label className="font-body text-sm text-foreground mb-2 block">
                    Product Images *
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-lg overflow-hidden border border-border"
                      >
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <Upload size={24} />
                      <span className="text-xs mt-1">Upload</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {images.length > 0 && (
                  <div>
                    <Label className="font-body text-sm text-foreground mb-2 block">
                      Preview
                    </Label>
                    <ProductImageSlider
                      images={images}
                      productName={formData.name || 'Product preview'}
                    />
                  </div>
                )}

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="font-body text-sm text-foreground mb-2 block">
                      Product Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Diamond Eternity Ring"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shortDescription" className="font-body text-sm text-foreground mb-2 block">
                      Short Description
                    </Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Brief tagline"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="font-body text-sm text-foreground mb-2 block">
                    Full Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed product description..."
                    rows={4}
                  />
                </div>

                {/* Pricing */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price" className="font-body text-sm text-foreground mb-2 block">
                      Price ($) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice" className="font-body text-sm text-foreground mb-2 block">
                      Original Price (for sale items)
                    </Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Category, Material, Stone */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label className="font-body text-sm text-foreground mb-2 block">
                      Category *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as Product['category'] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c.id !== 'newly-launched').map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-body text-sm text-foreground mb-2 block">
                      Material *
                    </Label>
                    <Select
                      value={formData.material}
                      onValueChange={(value) => setFormData({ ...formData, material: value as Product['material'] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((mat) => (
                          <SelectItem key={mat.id} value={mat.id}>
                            {mat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-body text-sm text-foreground mb-2 block">
                      Stone
                    </Label>
                    <Select
                      value={formData.stone}
                      onValueChange={(value) => setFormData({ ...formData, stone: value as Product['stone'] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stone" />
                      </SelectTrigger>
                      <SelectContent>
                        {stones.map((stone) => (
                          <SelectItem key={stone.id} value={stone.id}>
                            {stone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <Label className="font-body text-sm text-foreground mb-2 block">
                    Sizes (for rings)
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      placeholder="e.g., 6.5"
                      className="w-32"
                    />
                    <Button type="button" variant="outline" onClick={addSize}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.sizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
                      >
                        {size}
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                    />
                    <Label htmlFor="inStock" className="font-body text-sm">
                      In Stock
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="isNew"
                      checked={formData.isNew}
                      onCheckedChange={(checked) => setFormData({ ...formData, isNew: checked })}
                    />
                    <Label htmlFor="isNew" className="font-body text-sm">
                      New Arrival
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="isBestseller"
                      checked={formData.isBestseller}
                      onCheckedChange={(checked) => setFormData({ ...formData, isBestseller: checked })}
                    />
                    <Label htmlFor="isBestseller" className="font-body text-sm">
                      Bestseller
                    </Label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button type="submit" className="w-full md:w-auto">
                    {editingId ? 'Update Product' : 'Add Product'}
                  </Button>
                  {editingId && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full md:w-auto"
                      onClick={resetForm}
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Product List */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-6">
                All Products ({products.length})
              </h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 bg-card border border-border rounded-lg p-4"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-foreground">
                        {product.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        ${product.price.toLocaleString()} • {product.category}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(product)}
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
