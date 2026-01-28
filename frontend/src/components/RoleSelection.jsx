import { useForm } from "react-hook-form";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "",
    },
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (data) => {
    try {
      const token = await getToken();

      const res = await fetch("http://localhost:4000/user-api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: data.role,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Profile creation failed");
      }

      // ✅ Profile saved → go to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Select your role</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* USER */}
        <label style={{ display: "block", marginBottom: 10 }}>
          <input
            type="radio"
            value="USER"
            {...register("role", {
              required: "Please select a role",
            })}
          />
          User
        </label>

        {/* ADMIN */}
        <label style={{ display: "block", marginBottom: 10 }}>
          <input
            type="radio"
            value="AUTHOR"
            {...register("role", {
              required: "Please select a role",
            })}
          />
          Author
        </label>

        {/* Validation error */}
        {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default RoleSelection;
