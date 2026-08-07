import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import loginBg from "../../assets/images/loginBg.png"

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await login(form);

      if (result.success) {
        navigate("/dashboard", {
          replace: true,
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed."
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-bg flex min-h-screen items-center justify-center bg-gray-100">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="w-full z-10 max-w-md rounded-lg bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-3"
              required
            />

          </div>

          <div className="mb-6">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded border p-3"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}