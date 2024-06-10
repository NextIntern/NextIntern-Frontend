import CampaignForm from "@/components/CampaignForm"

export default function Page() {
  return (
    <section className="mx-auto max-w-4xl rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="text-primary mb-8 text-2xl font-extrabold capitalize">Create Campaign</h1>
      <CampaignForm />
    </section>
  )
}
