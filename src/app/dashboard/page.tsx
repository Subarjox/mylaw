import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export default function TestCRUD() {
    return (
      <Card className="w-full max-w-2/3 mt-10 mx-auto">
        <CardHeader>
          <CardTitle>Test CRUD</CardTitle>
          <CardDescription>
            Disini Kamu akan test CRUD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>List Data CRUD</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Sukimak</TableCell>
                <TableCell>ewewewe</TableCell>
                <TableCell>ewewewe</TableCell>
                <TableCell>

                <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="outline">Action</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

                </TableCell>
              </TableRow>



            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  