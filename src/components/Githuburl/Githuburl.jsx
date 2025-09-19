import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Github, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Githuburl.css'; 

const GITHUB_RE = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/i;

export default function Githuburl() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const submit = async (data) => {
    if (!GITHUB_RE.test(data.repo)) {
      toast.error('Enter a valid GitHub URL');
      return;
    }
    // ✅ Instead of calling onSubmit, go to /choose-format
    navigate('/choose-format', { state: { repoUrl: data.repo } });
    reset();
  };

  return (
    <div className="githuburl-container">
      <div className="githuburl-header">
        <Github size={20} className="githuburl-icon" />
        <div>
          <h2 className="githuburl-title">Repository Analysis</h2>
          <p className="githuburl-subtext">
            Enter a GitHub repository URL to generate documentation
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(submit)} className="githuburl-form">
        <div className="githuburl-input-wrapper">
          <Search size={18} className="githuburl-search-icon" />
          <input
            type="url"
            placeholder="https://github.com/username/repository"
            {...register('repo', { required: true })}
            className="githuburl-input"
          />
          {errors.repo && (
            <p className="githuburl-error">Repository URL is required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="githuburl-button"
        >
          {isSubmitting ? 'Loading…' : 'Next'}
        </button>
      </form>
    </div>
  );
}
