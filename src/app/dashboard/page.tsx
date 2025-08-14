"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";

export default function TestCRUD() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/product/call")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  
  const [nama, setnama] = useState("");
  const [gambar, setgambar] = useState("");
  const [deskripsi, setdeskripsi] = useState("");

  const tambahproduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/product/tambah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, gambar, deskripsi })
    });
  }

  return (
    <div>
      <Card className="w-full max-w-4xl mt-10 mx-auto">
        <CardHeader>
          <CardTitle>Test CRUD</CardTitle>
          <CardDescription>
            Disini Kamu akan test CRUD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id_product}>
                  <TableCell>{p.id_product}</TableCell>
                  <TableCell>{p.gambar}</TableCell>
                  <TableCell>{p.nama}</TableCell>
                  <TableCell>{p.deskripsi}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Action</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onClick={() => setSelectedProduct(p)}
                              className="flex items-center gap-2"
                              onSelect={e => e.preventDefault()}
                            >
                              <Pencil className="w-4 h-4" /> Edit
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Edit Data produk
                              </DialogDescription>
                            </DialogHeader>
                            <form className="space-y-4">
                              <Input defaultValue={selectedProduct?.nama} placeholder="Nama" />
                              <Input defaultValue={selectedProduct?.gambar} placeholder="Gambar" />
                              <Input defaultValue={selectedProduct?.deskripsi} placeholder="Deskripsi" />
                              <Button type="submit">Simpan</Button>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-red-600"
                              onSelect={e => e.preventDefault()}
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Yakin Hapus Produk?</DialogTitle>
                              <DialogDescription>
                                Produk akan dihapus
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button variant="outline">Batal</Button>
                              <Button variant="destructive">
                                Hapus
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        
          <Dialog>
          <DialogTrigger asChild>
          <Button variant="secondary" className="mt-4 w-full">Tambah Produk</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
               <DialogTitle>Tambah Produvt</DialogTitle>
                  <DialogDescription>
                    Tambah produk
                  </DialogDescription>
                    </DialogHeader>
                      <form className="space-y-4" onSubmit={tambahproduct}>
                        <Input 
                        placeholder="Nama"
                        type="text"
                        value={nama}
                        onChange={(e) => setnama(e.target.value)}
                        required
                        />
                        <Input                         
                        placeholder="deksripsi"
                        type="text"
                        value={deskripsi}
                        onChange={(e) => setdeskripsi(e.target.value)}
                        required/>
                        <Input 
                        placeholder="gambar"
                        type="text"
                        value={gambar}
                        onChange={(e) => setgambar(e.target.value)}
                        required
                        />
                        <Button className="w-auto justify-center" type="submit">Tambah</Button>
                       </form>
          </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
