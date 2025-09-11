import Header from "@/components/Header";

export default function HeaderOnly() {
  return (
    <div className="min-h-screen bg-white">
      <Header showTopBar showUserActions activeTab="purchase" assignBadgeCount={5} cartBadgeCount={20} />
    </div>
  );
}
