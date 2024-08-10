import { FC } from "react";
import { Recipe } from "../../types";

type RecipeVideoType = {
  videoUrls?: Recipe["videoUrls"];
};
export const RecipeVideo: FC<RecipeVideoType> = ({ videoUrls = [] }) => {
  const hasVideo = videoUrls ? videoUrls.length > 0 : false;
  return (
    <section className="media ml-5">
      {hasVideo && (
        <div className="video-container">
          <video
            src={videoUrls[0]}
            controls
            controlsList={"nodownload noremoteplay"}
          ></video>
        </div>
      )}
    </section>
  );
};
