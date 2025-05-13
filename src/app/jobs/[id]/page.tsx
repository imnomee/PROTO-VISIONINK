'use client';

import { useState, useEffect, useCallback } from 'react';
import { jobs } from '@/data/jobs';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { matchingResults } from '@/data/matching';

interface MatchingResults {
    name: string;
    overallMatch: number;
    skillsMatch: number;
    experienceMatch: string;
    comments: string[];
}

interface Job {
    id: string;
    title: string;
    company: string;
    department: string;
    location: string;
    salaryRange: string;
    description: string;
    skills: string[];
    experienceLevel: string;
    employmentType: string;
}

const SingleJobViewPage = () => {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [matchingLoading, setMatchingLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [matchingData, setMatchingData] = useState<MatchingResults[] | null>(
        null
    );
    const params = useParams();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    });

    useEffect(() => {
        const fetchJob = async () => {
            // Simulate an asynchronous operation
            await new Promise((resolve) => setTimeout(resolve, 500));

            const foundJob = jobs.find((job) => job.id === params.id) || null;
            setJob(foundJob);
            setLoading(false);
        };

        fetchJob();
    }, [params.id]);

    const handleMatchResumes = () => {
        // Simulate AI matching process
        setMatchingData(null);
        setMatchingLoading(true);
        setTimeout(() => {
            setMatchingData(matchingResults.slice(0, files.length));
            setMatchingLoading(false);
        }, 1000);
    };

    if (loading) {
        return (
            <Card className="w-[80%] mx-auto max-w-[1200px]">
                <CardContent>Loading...</CardContent>
            </Card>
        );
    }

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <>
            <Link href="/jobs">
                <Button>View All Jobs</Button>
            </Link>
            <Card className="w-[80%] mx-auto max-w-[1200px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {job.title}
                    </CardTitle>
                    <CardDescription>
                        {job.company} - {job.location}
                    </CardDescription>
                </CardHeader>
                <Separator className="my-1" />
                <CardContent>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    <ul className="list-disc list-inside mb-4">
                        {job.skills.map((skill) => (
                            <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                    <Separator className="my-2" />
                    <h2 className="text-lg font-semibold mb-2">
                        Resume Upload
                    </h2>
                    <div
                        {...getRootProps()}
                        className={`dropzone ${
                            isDragActive ? 'active' : ''
                        } border-2 border-dashed border-gray-300 bg-gray-100 p-4 rounded-md`}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="text-center">
                                Drop the files here ...
                            </p>
                        ) : (
                            <p className="text-center text-gray-500">
                                Drag &apos;n&apos; drop some files here, or
                                click to select files
                            </p>
                        )}
                    </div>
                    <ul>
                        {files.map((f) => (
                            <li key={f.name}>
                                {f.name} - {f.size} bytes
                            </li>
                        ))}
                    </ul>
                    <Button
                        className="my-4"
                        onClick={handleMatchResumes}
                        disabled={files.length === 0}>
                        Match Resumes
                    </Button>
                    <Separator className="my-1" />

                    {matchingLoading ? (
                        <div>Loading...</div>
                    ) : (
                        matchingData &&
                        matchingData.map((result, index) => (
                            <div key={index} className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            AI Matching Results - {result.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>
                                            Overall Match:{' '}
                                            {result?.overallMatch}
                                        </p>
                                        <p>
                                            Skills Match: {result?.skillsMatch}%
                                        </p>
                                        <p>
                                            Experience Match:{' '}
                                            {result?.experienceMatch}
                                        </p>
                                        <h3 className="text-lg font-semibold mt-2">
                                            Comments:
                                        </h3>
                                        <ul>
                                            {result.comments?.map(
                                                (comment, index) => (
                                                    <li key={index}>
                                                        {comment}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    )}
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </>
    );
};

export default SingleJobViewPage;
