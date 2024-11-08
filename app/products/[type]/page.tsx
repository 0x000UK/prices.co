"use client";
import Ad from "@/components/products/ad";
import { MyProvider } from "@/components/products/context";
import ResultProducts from "@/components/products/searchResult";
import style from "@/styles/productPage.module.css";
export default function ProductPage() {
	return (
		<div className={style.productPage}>
			<Ad/>
			<MyProvider>
				<ResultProducts />
			</MyProvider>
		</div>
	);
}
