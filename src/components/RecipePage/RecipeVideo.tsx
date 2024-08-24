import { FC, useRef, useState } from "react";
import { RemoveItemFunction, Recipe } from "../../types";
import { useUpdateRecipeContext } from "./context";

type RecipeVideoType = {
  photoUrls?: Recipe["photoUrls"];
  photoUploads?: Array<File>;
  removeItem: RemoveItemFunction;
};
export const RecipeVideo: FC<RecipeVideoType> = ({
  photoUrls = [],
  photoUploads = [],
  removeItem,
}) => {
  const { editing, updateEditedRecipe } = useUpdateRecipeContext();
  const hasPhotos = photoUrls ? photoUrls.length > 0 : false;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [over, setDropping] = useState(false);
  if (editing) {
    return (
      <div
        className={`w-full min-h-32 transition p-2 ${over ? "bg-black " : "bg-primary "} `}
        onDragEnter={() => {
          setDropping(true);
        }}
        onDragLeave={() => {
          setDropping(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDropping(false);
          updateEditedRecipe("photoUploads", [...e.dataTransfer.files]);
        }}
      >
        <label
          className={`
          media p-5 block w-full h-32 drop-shadow-md flex items-center 
            w-full border-lbrown bg-black transition 
            hover:bg-lbrown focus-within:bg-lbrown`}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.click();
          }}
          htmlFor="photo-uploads"
          tabIndex={0}
        >
          <>
            <p className="text-3xl font-bold w-full text-center uppercase">
              Upload from pc
            </p>

            <input
              id="photo-uploads"
              name="photo-uploads"
              hidden
              multiple
              ref={inputFileRef}
              type={"file"}
              accept="image/png, image/jpg"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const files = Array.from(e.target.files);
                  updateEditedRecipe("photoUploads", files);
                }
              }}
            />
          </>
        </label>
        <ol className="mt-4 w-full flex gap-4">
          {photoUploads.map((file, index) => {
            return (
              <li
                key={file.name}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.click();
                }}
                htmlFor="photo-uploads"
                className="w-32 transition hover:-translate-y-2 focus:-translate-y-2 focus:hover:box-shadow-2"
                onClick={() => removeItem("photoUploads", index)}
              >
                <img src={URL.createObjectURL(file)} />
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
  return (
    <section className="media col-span-2 mt-4 lg:mt-0 lg:col-span-1 lg:ml-5">
      {hasPhotos &&
        photoUrls.map((p) => (
          <div key={p} className="image-container border-2 inline-block w-1/2 first:w-full">
          <img src={p} className="w-full" />
          </div>
        ))}
    </section>
  );
};
