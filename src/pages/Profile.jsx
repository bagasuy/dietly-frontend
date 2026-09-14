import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticatedNavbar from "../components/AuthenticatedNavbar";

import { getCurrentUser, updateCurrentUser } from "../services/auth";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    height: "",
    current_weight: "",
    target_weight: "",
    daily_calorie_goal: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("dietly_token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const userData = await getCurrentUser(token);

        setProfile({
          username: userData.username || "",
          email: userData.email || "",
          height: userData.height ?? "",
          current_weight: userData.current_weight ?? "",
          target_weight: userData.target_weight ?? "",
          daily_calorie_goal: userData.daily_calorie_goal ?? "",
        });
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("dietly_token");
          localStorage.removeItem("dietly_user");
          navigate("/login", { replace: true });
          return;
        }

        setError(err.response?.data?.detail || "Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("dietly_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updateCurrentUser(token, {
        height: profile.height === "" ? null : Number(profile.height),
        current_weight:
          profile.current_weight === "" ? null : Number(profile.current_weight),
        target_weight:
          profile.target_weight === "" ? null : Number(profile.target_weight),
        daily_calorie_goal:
          profile.daily_calorie_goal === ""
            ? null
            : Number(profile.daily_calorie_goal),
      });

      setProfile((currentProfile) => ({
        ...currentProfile,
        height: updatedProfile.height ?? "",
        current_weight: updatedProfile.current_weight ?? "",
        target_weight: updatedProfile.target_weight ?? "",
        daily_calorie_goal: updatedProfile.daily_calorie_goal ?? "",
      }));

      setSuccess("Profile updated successfully.");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("dietly_token");
        localStorage.removeItem("dietly_user");
        navigate("/login", { replace: true });
        return;
      }

      setError(err.response?.data?.detail || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <AuthenticatedNavbar />

        <main className="profile-page">
          <div className="profile-container">
            <p>Loading your profile...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AuthenticatedNavbar />
      <main className="profile-page">
        <div className="profile-container">
          <header className="profile-header">
            <div>
              <span className="profile-eyebrow">Your account</span>

              <h1>Profile</h1>

              <p>Manage your personal information and nutrition goals.</p>
            </div>

            <Link to="/dashboard" className="button button-secondary">
              Back to dashboard
            </Link>
          </header>

          {error && <div className="profile-error">{error}</div>}

          {success && <div className="profile-success">{success}</div>}

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-section">
              <h2>Account information</h2>

              <div className="profile-grid">
                <label className="profile-field">
                  <span>Username</span>
                  <input type="text" value={profile.username} disabled />
                </label>

                <label className="profile-field">
                  <span>Email</span>
                  <input type="email" value={profile.email} disabled />
                </label>
              </div>
            </div>

            <div className="profile-section">
              <h2>Body information</h2>

              <div className="profile-grid">
                <label className="profile-field">
                  <span>Height (cm)</span>
                  <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                    min="1"
                    step="0.01"
                  />
                </label>

                <label className="profile-field">
                  <span>Current weight (kg)</span>
                  <input
                    type="number"
                    name="current_weight"
                    value={profile.current_weight}
                    onChange={handleChange}
                    min="1"
                    step="0.01"
                  />
                </label>

                <label className="profile-field">
                  <span>Target weight (kg)</span>
                  <input
                    type="number"
                    name="target_weight"
                    value={profile.target_weight}
                    onChange={handleChange}
                    min="1"
                    step="0.01"
                  />
                </label>

                <label className="profile-field">
                  <span>Daily calorie goal (kcal)</span>
                  <input
                    type="number"
                    name="daily_calorie_goal"
                    value={profile.daily_calorie_goal}
                    onChange={handleChange}
                    min="1"
                  />
                </label>
              </div>
            </div>

            <div className="profile-actions">
              <button
                type="submit"
                className="button button-primary"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Profile;
