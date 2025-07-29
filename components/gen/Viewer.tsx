"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Edit3,
  Save,
  X,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  FileImage,
  Copy,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ReactFlowRenderer from "@/components/gen/test";
import { updateDiagramTest } from "@/lib/actions/flow";
import { toPng, toJpeg, toSvg } from "html-to-image";
import LoadingComponent from "../LoadingComponent";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface DiagramViewerProps {
  id: string;
  initialPrompt: string;
  initialDiagram: any;
}

const Viewer: React.FC<DiagramViewerProps> = ({
  id,
  initialPrompt,
  initialDiagram,
}) => {
  const router = useRouter();
  const [diagram, setDiagram] = useState(initialDiagram);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editPrompt, setEditPrompt] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    if (!editPrompt.trim()) {
      toast.error("Please enter your modification request");
      return;
    }

    setIsUpdating(true);
    try {
      const result = await updateDiagramTest(id, editPrompt);

      if (result.success && result.data) {
        setDiagram(result.data.diagram);
        setPrompt(result.data.prompt);
        toast.success("Diagram updated successfully!");
        setEditPrompt("");
        setIsDialogOpen(false);
      } else {
        throw new Error(result.error || "Failed to update diagram");
      }
    } catch (error) {
      console.error("Error updating diagram:", error);
      toast.error("Failed to update diagram. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const downloadImage = useCallback(
    async (format: "png" | "jpg" | "svg") => {
      if (!diagramRef.current) {
        toast.error("Diagram not found");
        return;
      }

      try {
        const element = diagramRef.current.querySelector(".react-flow");
        if (!element) {
          toast.error("Diagram element not found");
          return;
        }

        let dataUrl: string;
        let filename: string;

        switch (format) {
          case "png":
            dataUrl = await toPng(element as HTMLElement, {
              backgroundColor: "#ffffff",
              width: 1200,
              height: 800,
              style: {
                transform: "scale(1)",
                transformOrigin: "top left",
              },
            });
            filename = `diagram-${id}.png`;
            break;
          case "jpg":
            dataUrl = await toJpeg(element as HTMLElement, {
              backgroundColor: "#ffffff",
              width: 1200,
              height: 800,
              quality: 0.95,
              style: {
                transform: "scale(1)",
                transformOrigin: "top left",
              },
            });
            filename = `diagram-${id}.jpg`;
            break;
          case "svg":
            dataUrl = await toSvg(element as HTMLElement, {
              backgroundColor: "#ffffff",
              width: 1200,
              height: 800,
              style: {
                transform: "scale(1)",
                transformOrigin: "top left",
              },
            });
            filename = `diagram-${id}.svg`;
            break;
          default:
            throw new Error("Unsupported format");
        }

        const link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();

        toast.success(`Diagram downloaded as ${format.toUpperCase()}`);
      } catch (error) {
        console.error("Error downloading image:", error);
        toast.error(`Failed to download ${format.toUpperCase()} image`);
      }
    },
    [id]
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                 Forge Flow
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-md">
                  {prompt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Link Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Share
                  </>
                )}
              </Button>

              {/* Download Dropdown */}
              <div className="relative group">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                  <div className="p-2 space-y-1 min-w-[120px]">
                    <button
                      onClick={() => downloadImage("png")}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <ImageIcon className="h-4 w-4" />
                      PNG
                    </button>
                    <button
                      onClick={() => downloadImage("jpg")}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <FileImage className="h-4 w-4" />
                      JPG
                    </button>
                    <button
                      onClick={() => downloadImage("svg")}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <FileImage className="h-4 w-4" />
                      SVG
                    </button>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="sm"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle>Modify Diagram</DialogTitle>
                      
                    </div>
                    <DialogDescription>
                      Describe the changes you'd like to apply to the diagram.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      What would you like to change?
                    </label>
                    <Textarea
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="e.g., 'Add a decision node after step 2'"
                      className="min-h-[100px]"
                      disabled={isUpdating}
                    />
                  </div>

                  <DialogFooter className="flex justify-end gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      disabled={isUpdating || !editPrompt.trim()}
                      className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Update Diagram
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram View */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div ref={diagramRef} className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            {isUpdating ? <LoadingComponent /> : <ReactFlowRenderer response={diagram} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
