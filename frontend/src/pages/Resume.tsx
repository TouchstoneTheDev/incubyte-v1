import { useState } from 'react';
import './Resume.css';

interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
  description: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
}

interface VisibilitySettings {
  personalInfo: boolean;
  summary: boolean;
  workExperience: boolean;
  education: boolean;
  skills: boolean;
  certifications: boolean;
}

export const Resume = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
  });

  const [visibility, setVisibility] = useState<VisibilitySettings>({
    personalInfo: true,
    summary: true,
    workExperience: true,
    education: true,
    skills: true,
    certifications: true,
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [currentCertification, setCurrentCertification] = useState('');
  const [currentWork, setCurrentWork] = useState<WorkExperience>({
    company: '',
    position: '',
    duration: '',
    description: '',
  });
  const [currentEducation, setCurrentEducation] = useState<Education>({
    institution: '',
    degree: '',
    year: '',
    description: '',
  });

  const handlePersonalInfoChange = (field: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const handleSummaryChange = (value: string) => {
    setResumeData({
      ...resumeData,
      summary: value,
    });
  };

  const addWorkExperience = () => {
    if (currentWork.company && currentWork.position) {
      setResumeData({
        ...resumeData,
        workExperience: [...resumeData.workExperience, currentWork],
      });
      setCurrentWork({
        company: '',
        position: '',
        duration: '',
        description: '',
      });
    }
  };

  const removeWorkExperience = (index: number) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    if (currentEducation.institution && currentEducation.degree) {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, currentEducation],
      });
      setCurrentEducation({
        institution: '',
        degree: '',
        year: '',
        description: '',
      });
    }
  };

  const removeEducation = (index: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, currentSkill.trim()],
      });
      setCurrentSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  const addCertification = () => {
    if (currentCertification.trim()) {
      setResumeData({
        ...resumeData,
        certifications: [...resumeData.certifications, currentCertification.trim()],
      });
      setCurrentCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((_, i) => i !== index),
    });
  };

  const toggleVisibility = (section: keyof VisibilitySettings) => {
    setVisibility({
      ...visibility,
      [section]: !visibility[section],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-container">
      <div className="resume-form">
        <h1>Resume Builder</h1>

        {/* Personal Information Section */}
        <section className="form-section">
          <div className="section-header">
            <h2>Personal Information</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={visibility.personalInfo}
                onChange={() => toggleVisibility('personalInfo')}
              />
              Show in preview
            </label>
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={resumeData.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              value={resumeData.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              value={resumeData.personalInfo.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              placeholder="123 Main St, City, State 12345"
            />
          </div>
        </section>

        {/* Professional Summary Section */}
        <section className="form-section">
          <div className="section-header">
            <h2>Professional Summary</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={visibility.summary}
                onChange={() => toggleVisibility('summary')}
              />
              Show in preview
            </label>
          </div>
          <div className="input-group">
            <textarea
              value={resumeData.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder="A brief professional summary..."
              rows={4}
            />
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="form-section">
          <div className="section-header">
            <h2>Work Experience</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={visibility.workExperience}
                onChange={() => toggleVisibility('workExperience')}
              />
              Show in preview
            </label>
          </div>
          <div className="added-items">
            {resumeData.workExperience.map((work, index) => (
              <div key={index} className="added-item">
                <div>
                  <strong>{work.position}</strong> at {work.company} ({work.duration})
                </div>
                <button onClick={() => removeWorkExperience(index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="input-group">
            <label>Company</label>
            <input
              type="text"
              value={currentWork.company}
              onChange={(e) => setCurrentWork({ ...currentWork, company: e.target.value })}
              placeholder="Company Name"
            />
          </div>
          <div className="input-group">
            <label>Position</label>
            <input
              type="text"
              value={currentWork.position}
              onChange={(e) => setCurrentWork({ ...currentWork, position: e.target.value })}
              placeholder="Job Title"
            />
          </div>
          <div className="input-group">
            <label>Duration</label>
            <input
              type="text"
              value={currentWork.duration}
              onChange={(e) => setCurrentWork({ ...currentWork, duration: e.target.value })}
              placeholder="Jan 2020 - Dec 2022"
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea
              value={currentWork.description}
              onChange={(e) => setCurrentWork({ ...currentWork, description: e.target.value })}
              placeholder="Job responsibilities and achievements..."
              rows={3}
            />
          </div>
          <button onClick={addWorkExperience} className="add-btn">
            Add Work Experience
          </button>
        </section>

        {/* Education Section */}
        <section className="form-section">
          <div className="section-header">
            <h2>Education</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={visibility.education}
                onChange={() => toggleVisibility('education')}
              />
              Show in preview
            </label>
          </div>
          <div className="added-items">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="added-item">
                <div>
                  <strong>{edu.degree}</strong> from {edu.institution} ({edu.year})
                </div>
                <button onClick={() => removeEducation(index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="input-group">
            <label>Institution</label>
            <input
              type="text"
              value={currentEducation.institution}
              onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
              placeholder="University Name"
            />
          </div>
          <div className="input-group">
            <label>Degree</label>
            <input
              type="text"
              value={currentEducation.degree}
              onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>
          <div className="input-group">
            <label>Year</label>
            <input
              type="text"
              value={currentEducation.year}
              onChange={(e) => setCurrentEducation({ ...currentEducation, year: e.target.value })}
              placeholder="2018 - 2022"
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea
              value={currentEducation.description}
              onChange={(e) => setCurrentEducation({ ...currentEducation, description: e.target.value })}
              placeholder="Additional details..."
              rows={2}
            />
          </div>
          <button onClick={addEducation} className="add-btn">
            Add Education
          </button>
        </section>

        {/* Skills Section */}
        <section className="form-section">
          <div className="section-header">
            <h2>Skills</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={visibility.skills}
                onChange={() => toggleVisibility('skills')}
              />
              Show in preview
            </label>
          </div>
          <div className="added-items">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="added-item">
                <div>{skill}</div>
                <button onClick={() => removeSkill(index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              placeholder="Enter a skill"
            />
          </div>
          <button onClick={addSkill} className="add-btn">
            Add Skill
          </button>
        </section>

        {/* Certifications Section */}
        <section className="form-section">
          <div className="section-header">
            <h2>Certifications</h2>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={visibility.certifications}
                onChange={() => toggleVisibility('certifications')}
              />
              Show in preview
            </label>
          </div>
          <div className="added-items">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="added-item">
                <div>{cert}</div>
                <button onClick={() => removeCertification(index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              value={currentCertification}
              onChange={(e) => setCurrentCertification(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCertification()}
              placeholder="Enter a certification"
            />
          </div>
          <button onClick={addCertification} className="add-btn">
            Add Certification
          </button>
        </section>
      </div>

      {/* Resume Preview */}
      <div className="resume-preview">
        <div className="preview-header">
          <h2>Resume Preview</h2>
          <button onClick={handlePrint} className="print-btn">
            Print Resume
          </button>
        </div>
        <div className="preview-content" id="resume-content">
          {visibility.personalInfo && resumeData.personalInfo.name && (
            <div className="preview-section personal-info">
              <h1>{resumeData.personalInfo.name}</h1>
              <div className="contact-info">
                {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.address && <span>{resumeData.personalInfo.address}</span>}
              </div>
            </div>
          )}

          {visibility.summary && resumeData.summary && (
            <div className="preview-section">
              <h2>Professional Summary</h2>
              <p>{resumeData.summary}</p>
            </div>
          )}

          {visibility.workExperience && resumeData.workExperience.length > 0 && (
            <div className="preview-section">
              <h2>Work Experience</h2>
              {resumeData.workExperience.map((work, index) => (
                <div key={index} className="experience-item">
                  <h3>{work.position}</h3>
                  <div className="company-duration">
                    <span className="company">{work.company}</span>
                    {work.duration && <span className="duration">{work.duration}</span>}
                  </div>
                  {work.description && <p>{work.description}</p>}
                </div>
              ))}
            </div>
          )}

          {visibility.education && resumeData.education.length > 0 && (
            <div className="preview-section">
              <h2>Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h3>{edu.degree}</h3>
                  <div className="institution-year">
                    <span className="institution">{edu.institution}</span>
                    {edu.year && <span className="year">{edu.year}</span>}
                  </div>
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {visibility.skills && resumeData.skills.length > 0 && (
            <div className="preview-section">
              <h2>Skills</h2>
              <div className="skills-list">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {visibility.certifications && resumeData.certifications.length > 0 && (
            <div className="preview-section">
              <h2>Certifications</h2>
              <ul className="certifications-list">
                {resumeData.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
