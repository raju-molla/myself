import PageHeader from "../../component/PageHeader";
import BlogForm from "../../component/BlogForm";

export default function NewBlogPage() {
  return (
    <>
      <PageHeader title="New Blog Post" description="Draft it, then publish when ready" />
      <BlogForm />
    </>
  );
}
