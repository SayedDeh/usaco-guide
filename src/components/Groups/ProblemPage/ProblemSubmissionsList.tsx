import * as React from 'react';
import {
  getSubmissionEarnedPoints,
  getSubmissionStatus,
  getSubmissionTimestampString,
  ProblemData,
  Submission,
} from '../../../models/groups/posts';
import { useProblemSubmissionPopupAction } from '../ProblemSubmissionPopup';

const SubmissionListItem = ({
  problem,
  submission,
}: {
  problem: ProblemData;
  submission: Submission;
}) => {
  const showSubmissionAction = useProblemSubmissionPopupAction();
  return (
    <li className="relative py-2 group">
      <div className="flex items-center justify-between space-x-4">
        <span className="block leading-3 text-sm text-gray-500 group-hover:text-gray-900 font-medium">
          <button
            type="button"
            className="focus:outline-none"
            onClick={() => showSubmissionAction(submission)}
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {getSubmissionTimestampString(submission)}
          </button>
        </span>
        <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-900 font-medium">
          <span
            className={`h-5 w-5 ${
              getSubmissionStatus(submission) === 'AC'
                ? 'bg-green-100'
                : 'bg-red-100'
            } rounded-full flex items-center justify-center`}
            aria-hidden="true"
          >
            <span
              className={`h-2.5 w-2.5 ${
                getSubmissionStatus(submission) === 'AC'
                  ? 'bg-green-400'
                  : 'bg-red-400'
              } rounded-full`}
            />
          </span>
          <span
            className={`ml-2 mr-4 ${
              getSubmissionStatus(submission) === 'AC'
                ? 'text-green-800'
                : 'text-red-800'
            }`}
          >
            {getSubmissionEarnedPoints(submission, problem)} / {problem.points}
          </span>
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </li>
  );
};

export default function ProblemSubmissionsList({
  problem,
  submissions,
}: {
  problem: ProblemData;
  submissions: Submission[];
}) {
  if (!submissions?.length) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No submissions yet!
      </p>
    );
  }
  return (
    <ul>
      {submissions.map(submission => (
        <SubmissionListItem
          problem={problem}
          submission={submission}
          key={submission.id}
        />
      ))}
    </ul>
  );
}
