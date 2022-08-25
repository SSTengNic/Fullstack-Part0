export interface CourseNormalPart extends CoursePartBase,CoursePartExtension {
    type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
  
export interface CourseSubmissionPart extends CoursePartBase,CoursePartExtension {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseRequirementPart extends CoursePartBase, CoursePartExtension {
  type: "special";
  requirements: ["nodejs","jest"];
  
}

interface CoursePartExtension {
  description: string;
  requirements?: Array<string>;
}
interface CoursePartBase{
    name: string;
    exerciseCount: number;
    type: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart;

  // due to string literals, TypeScript can identify which course part requires which additional attributes, even if the variable is defined to use the type union.
  //important to note that it still works despite in the type union.