import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() { return <><Header /><main className="auth-page"><AuthForm mode="register" /></main><Footer /></>; }
