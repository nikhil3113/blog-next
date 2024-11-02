import Banner from "@/components/Banner";
import FeaturedPost from "@/components/FeaturedPost";

export default async function Home() {
  return (
    <>
      <Banner />
      <div className="px-10">
        <FeaturedPost />
      </div>
    </>
  );
}
