import { Conference2025Archive, conference2025Metadata } from "@/components/Conference2025Archive";

export const metadata = conference2025Metadata("venue");

export default function Page() { return <Conference2025Archive page="venue" />; }
