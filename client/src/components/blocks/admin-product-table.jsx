// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export function AdminProductsTable({ products }) {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Image</TableHead>
//           <TableHead>Name</TableHead>
//           <TableHead>Category</TableHead>
//           <TableHead>Price</TableHead>
//           <TableHead>Stock</TableHead>
//           <TableHead>Seller</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Created</TableHead>
//         </TableRow>
//       </TableHeader>
//       {products.length == 0 ? (
//           <TableRow>
//             <TableCell
//               colSpan={columns.length}
//               className="h-24 text-center text-muted-foreground"
//             >
                
//             </TableCell>
//           </TableRow>
//         ) : (
//         <TableBody>
//           {products.map((product) => (
//             <TableRow key={product._id}>
//               <TableCell>
//                 <img
//                   src={product.images?.[0]}
//                   alt={product.name}
//                   className="h-12 w-12 rounded object-cover border"
//                 />
//               </TableCell>

//               <TableCell className="font-medium">{product.name}</TableCell>

//               <TableCell>
//                 <Badge variant="outline">{product.category}</Badge>
//               </TableCell>

//               <TableCell>₹{product.price}</TableCell>

//               <TableCell>
//                 {product.stock > 0 ? (
//                   <Badge variant="success">In Stock</Badge>
//                 ) : (
//                   <Badge variant="destructive">Out</Badge>
//                 )}
//               </TableCell>

//               <TableCell>{product.seller.name}</TableCell>

//               <TableCell className="text-muted-foreground">
//                 {product.seller.email}
//               </TableCell>

//               <TableCell>
//                 {new Date(product.createdAt).toLocaleDateString()}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       )}
//     </Table>
//   );
// }
