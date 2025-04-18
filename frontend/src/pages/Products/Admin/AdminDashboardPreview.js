import AdminDashboardPage from './AdminDashBoardPage'

export default function AdminDashboardPreview() {
  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen p-6">
      <AdminDashboardPage previewMode={true} />
    </div>
  );
}
