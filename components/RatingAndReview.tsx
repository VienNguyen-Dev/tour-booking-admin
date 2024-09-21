import React, { useRef, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import SvgIcon from "./SvgIcon";
import StarProgress from "./StarProgress";
import { formatDateTime } from "@/lib/utils";

interface Comment {
  id: number;
  username: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
}

const RatingAndReview = ({ user, onClose }: { user: User; onClose: () => void }) => {
  const availableRating = 40;
  const ratingCounts = [
    { star: 5, value: 18 }, // Bai toan tinh so sao trung binh khi co tong so danh gia 18 + 8+ 3+3+ 0.4
    { star: 4, value: 10 },
    { star: 3, value: 5 },
    { star: 2, value: 5 },
    { star: 1, value: 2 },
  ];
  let averageRating = 0;
  let sumStarWithFive = 0;
  ratingCounts.forEach((star) => {
    sumStarWithFive += (star.value * star.star) / 5;
    averageRating = (sumStarWithFive / availableRating) * 5;
    return averageRating;
  });

  const comments: Comment[] = [
    {
      id: 1,
      username: "John Doe",
      avatar: "/assets/icons/user1.png",
      rating: 5,
      title: "Great experience!",
      content: "I had an amazing time using this service. Highly recommended!",
      date: "2023-04-15T10:30:00Z",
    },
    {
      id: 2,
      username: "Jane Smith",
      avatar: "/assets/icons/user.png",
      rating: 4,
      title: "Very good, but room for improvement",
      content: "Overall, I'm satisfied with the service. There are a few minor issues that could be addressed.",
      date: "2023-04-10T14:45:00Z",
    },
    {
      id: 3,
      username: "Hary Kane",
      avatar: "/assets/icons/user1.png",
      rating: 4,
      title: "Very good, but room for improvement",
      content: "Overall, I'm satisfied with the service. There are a few minor issues that could be addressed.",
      date: "2023-04-10T14:45:00Z",
    },
    // Add more test comments as needed
  ];

  return (
    <div className="xl:max-w-[400px] xl:max-h-[718px]">
      <Sheet open={true} onOpenChange={onClose}>
        <SheetClose asChild>
          <SheetContent side={"right"} className="flex flex-col border-none rounded-xl bg-white gap-6  w-full p- mt-16 mr-12">
            <SheetHeader className="flex items-center justify-center">
              <SheetTitle className="text-[#014C46] text-lg xl:text-2xl font-bold h-[30px]">Ratings and Reviews</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 w-full  mt-2 pb-10">
              <div className="rounded-md border p-5 flex flex-col gap-1 border-[#014C461A] bg-[#014C4633] ">
                <div className="flex flex-col gap-2 items-center justify-center">
                  {/* total rating */}
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="flex justify-center items-center gap-2 px-5 py-[2px] rounded-[100px] bg-white">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const starValue = Math.min(Math.max(averageRating - star + 1, 0), 1);
                        return (
                          <div key={star} className="relative">
                            <SvgIcon path="/assets/icons/star-white.svg" width={16} height={16} color="#FFB849" />
                            <div className="absolute inset-0 overflow-hidden" style={{ width: `${starValue * 100}%` }}>
                              <SvgIcon path="/assets/icons/star.svg" width={16} height={16} color="#FFB849" />
                            </div>
                          </div>
                        );
                      })}
                      <p className="text-[#2F2B3D] text-xs font-bold">{averageRating.toFixed(1)} out of 5</p>
                    </div>
                    <p className="font-medium text-xs text-[#2F2B3D]">{`${availableRating} customers ratings`}</p>
                  </div>
                  {/* each of rating */}
                  <div className="flex flex-col w-full gap-2">
                    {ratingCounts.map((star) => {
                      const percentOfStar = Math.round((star.value / availableRating) * 100);
                      return (
                        <div className="flex gap-2 w-full items-center justify-between text-[#2F2B3D] font-medium text-xs">
                          <p className="w-[40px]">{`${star.star} ${star.star > 1 ? "Stars" : "Star"}`}</p>
                          <div className="flex-1 h-[12px]">
                            <StarProgress value={percentOfStar} />
                          </div>
                          <p>{`${percentOfStar}%`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {comments.map((comment: Comment) => (
                <div key={comment.id} className="rounded-md border p-5 flex flex-col gap-2 border-[#014C461A] bg-white">
                  <div className="flex justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <Image src={comment.avatar} width={24} height={24} alt={comment.title} />
                      <h2 className=" font-bold text-sm text-[#014C46]">{comment.username}</h2>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(comment.rating)].map((_, index) => (
                        <SvgIcon key={index} path="/assets/icons/star.svg" width={16} height={16} color="#FFB849" />
                      ))}
                    </div>
                  </div>
                  <h2 className=" font-bold textsm text-[#2F2B3D]">{comment.title}</h2>
                  <p className="font-normal text-xs text-[#2F2B3D] ">{comment.content}</p>
                  <div className=" flex justify-end">
                    <p className="text-[#494949] text-[8px] font-medium">{formatDateTime(new Date(comment.date)).dateOnly}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button className="text-[#2F2B3D] text-sm xl:text-lg font-bold border-none focus-visible:ring-0 focus:ring-transparent hover:opacity-90 transition-opacity">See All</Button>
            </div>
          </SheetContent>
        </SheetClose>
      </Sheet>
    </div>
  );
};

export default RatingAndReview;
