"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const JobPostingPage = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("remote");
  const [salaryRange, setSalaryRange] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [employmentType, setEmploymentType] = useState("full-time");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      title,
      company,
      department,
      location,
      salaryRange,
      description,
      skills,
      experienceLevel,
      employmentType,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Job Posting</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Job Title
          </label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
            Company Name
          </label>
          <Input
            type="text"
            id="company"
            value={company}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
            Department
          </label>
          <Input
            type="text"
            id="department"
            value={department}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>
        <div>
          <label htmlFor="salaryRange" className="block text-gray-700 text-sm font-bold mb-2">
            Salary Range
          </label>
          <Input
            type="text"
            id="salaryRange"
            value={salaryRange}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalaryRange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
            Required Skills
          </label>
          {/* Implement multi-select component here */}
        </div>
        <div>
          <label htmlFor="experienceLevel" className="block text-gray-700 text-sm font-bold mb-2">
            Experience Level
          </label>
          <Input
            type="text"
            id="experienceLevel"
            value={experienceLevel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceLevel(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employmentType" className="block text-gray-700 text-sm font-bold mb-2">
            Employment Type
          </label>
          <select
            id="employmentType"
            value={employmentType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmploymentType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <Button type="submit">Post Job</Button>
      </form>
    </div>
  );
};

export default JobPostingPage;