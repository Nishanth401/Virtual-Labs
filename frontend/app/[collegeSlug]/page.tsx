import { redirect } from "next/navigation";

interface CollegeRootPageProps {
  params: Promise<{
    collegeSlug: string;
  }>;
}

export default async function CollegeRootPage({ params }: CollegeRootPageProps) {
  const resolved = await params;
  const slug = resolved.collegeSlug || "vsb";
  redirect(`/${slug}/student-form`);
}
