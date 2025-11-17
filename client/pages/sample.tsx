import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Sample() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header activeTab="purchase" showUserActions />
      <main className="flex-1">
        <div className="max-w-[1260px] mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold">Sample Page</h1>
          <p className="text-muted-foreground mt-2">
            This is a sample page under client/pages/sample.tsx.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
