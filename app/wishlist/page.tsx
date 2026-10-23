import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Wishlist", description: "Find courses and contact Richmond Hill College about your previous saved selections.", path: "wishlist", index: false });

export default function WishlistPage() {
  return <div className="mx-auto max-w-3xl px-4 py-16"><h1 className="text-3xl font-bold">Wishlist</h1><p className="mt-5 text-slate-600">The previous website&apos;s wishlist is no longer available here. Previously saved selections have not been transferred. You can browse current courses or contact us for help finding a program.</p><div className="mt-6 flex gap-6"><Link href="/course-offerings" className="font-semibold underline">Browse courses</Link><Link href="/contact" className="font-semibold underline">Contact us</Link></div></div>;
}
