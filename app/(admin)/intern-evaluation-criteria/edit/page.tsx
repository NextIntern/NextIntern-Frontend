import InternEvaluationCriteriaForm from "@/components/InternEvaluationCriteriaForm"

export default function Page() {
  return (
    <section className="mx-auto max-w-4xl rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="mb-8 text-2xl font-extrabold capitalize text-primary">Update Evaluate Intern</h1>
      <InternEvaluationCriteriaForm />
    </section>
  )
}