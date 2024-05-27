"use client";

import Image from "next/image";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Instagram, Save, Twitter } from "react-feather";

import { updateDescriptionAndSocialMedia } from "@/services/userService";

interface UpdateProfileFormProps {
  userId: number;
  description: string;
  twitter: string;
  instagram: string;
  tiktok: string;
}

interface FormData {
  description?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
}

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .trim()
    .max(255, "Description too long, max length is 255")
    .matches(/^[a-zA-Z0-9\s.,'!&]*$/, "Description contains invalid characters")
    .optional(),
  twitter: yup
    .string()
    .trim()
    .matches(
      /^\w{0,15}$/,
      "Twitter username can only contain letters, numbers, and underscores, with a maximum length of 15 characters",
    )
    .optional(),
  instagram: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9.]{0,30}$/,
      "Instagram username can only contain numbers, letters, and periods, with a maximum length of 30 characters",
    )
    .optional(),
  tiktok: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9._]{0,24}$/,
      "TikTok username can only contain letters, numbers, periods, and underscores, with a maximum length of 24 characters",
    )
    .optional(),
});

export const UpdateProfileForm = ({ userId, description, twitter, instagram, tiktok }: UpdateProfileFormProps) => {
  const [userDescription, setUserDescription] = useState<string>(description);
  const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(false);

  const [userTwitter, setUserTwitter] = useState<string>(twitter);
  const [userInstagram, setUserInstagram] = useState<string>(instagram);
  const [userTiktok, setUserTiktok] = useState<string>(tiktok);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData: FormData) => {
    if (
      description !== formData.description ||
      twitter !== formData.twitter ||
      instagram !== formData.instagram ||
      tiktok !== formData.tiktok
    ) {
      try {
        await updateDescriptionAndSocialMedia(
          userId,
          formData.description ?? description,
          formData.twitter ?? twitter,
          formData.instagram ?? instagram,
          formData.tiktok ?? tiktok,
        );
        toast(<p>Your profile was updated!</p>, {
          icon: <Save />,
          className: "cyan-toast",
        });
      } catch (error) {
        toast.error(<p>Something went wrong!</p>);
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <h3 className="h5">Description </h3>

        {isDescriptionActive && (
          <div className="description-word-amount">
            <p className={userDescription.length <= 255 ? "description" : "description pink"}>
              {userDescription.length}/225
            </p>
          </div>
        )}

        <textarea
          rows={5}
          placeholder="Tell about yourself!"
          {...register("description")}
          value={userDescription}
          onChange={e => setUserDescription(e.currentTarget.value)}
          onFocus={() => setIsDescriptionActive(true)}
          onBlur={() => setIsDescriptionActive(false)}
        />
        {errors.description && <p className="error-text">{errors.description.message}</p>}
      </div>

      <h3 className="h5">Social Media</h3>
      <div className="profile-settings-social-media">
        <div className="social-media-row pink">
          <Twitter />
          <input
            type="text"
            placeholder="Your Twitter handle"
            {...register("twitter")}
            value={userTwitter}
            onChange={e => setUserTwitter(e.currentTarget.value)}
          />
        </div>
        {errors.twitter && <p className="error-text">{errors.twitter.message}</p>}

        <div className="social-media-row yellow">
          <Instagram />
          <input
            type="text"
            placeholder="Your Instagram handle"
            {...register("instagram")}
            value={userInstagram}
            onChange={e => setUserInstagram(e.currentTarget.value)}
          />
        </div>
        {errors.instagram && <p className="error-text">{errors.instagram.message}</p>}

        <div className="social-media-row cyan">
          <Image
            src="/icons/tiktok_icon.svg"
            height={24}
            width={24}
            alt="Tiktok"
          />
          <input
            type="text"
            placeholder="Your TikTok handle"
            {...register("tiktok")}
            value={userTiktok}
            onChange={e => setUserTiktok(e.currentTarget.value)}
          />
        </div>
        {errors.tiktok && <p className="error-text">{errors.tiktok.message}</p>}
      </div>
      <div className="submit-button">
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
