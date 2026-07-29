import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductSkeleton() {
    return ( <
        div className = "products-container" >
        <
        Skeleton height = { 40 }
        width = { 250 }
        />

        <
        br / >
        <
        br / >

        <
        Skeleton height = { 50 }
        />

        <
        br / >

        <
        Skeleton height = { 50 }
        />

        <
        br / >

        <
        Skeleton height = { 50 }
        />

        <
        br / >

        <
        Skeleton height = { 50 }
        />

        <
        br / >

        <
        Skeleton height = { 50 }
        />

        <
        br / >

        <
        Skeleton height = { 350 }
        /> <
        /div>
    );
}

export default ProductSkeleton;