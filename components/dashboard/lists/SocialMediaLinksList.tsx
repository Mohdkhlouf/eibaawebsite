export default function SocialMediaLinksList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Social Links</h2>
      <p className="text-gray-600">Manage your social media links here.</p>
      {/* Placeholder for social links list */}
      <div className="text-center py-12 text-gray-500">No social links found. Click "Add Link" to create one.</div>
      <div className="flex justify-end">
        <button
          onClick={() => alert('Add Link functionality not implemented yet')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          + Add Link
        </button>
      </div>
    </div>
  )
}
