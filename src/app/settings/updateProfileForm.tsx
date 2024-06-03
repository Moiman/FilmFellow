"use client";

import Image from "next/image";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Instagram, Save, Twitter } from "react-feather";

import { updateDescriptionAndSocialMedia } from "@/services/userService";
import { ErrorMessage } from "@/components/errorMessage";

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
    .matches(/^[^<>{};]*$/, "Description contains invalid characters")
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

        <div className="description-word-amount">
          <p className={userDescription.length <= 255 ? "description grey" : "description pink"}>
            {userDescription.length}/255
          </p>
        </div>

        <textarea
          rows={5}
          placeholder="Tell us about yourself! What are your favorite movies? Any genres you love or avoid? Share your all-time favorite movie moments!"
          {...register("description")}
          value={userDescription}
          onChange={e => setUserDescription(e.currentTarget.value)}
          aria-label="Description"
        />
        {errors.description && <ErrorMessage message={errors.description.message} />}
      </div>

      <h3 className="h5">Social Media</h3>
      <div className="profile-settings-social-media">
        <div className="social-media-row">
          <Twitter className="pink-icon" />
          <input
            type="text"
            placeholder="Your Twitter username"
            {...register("twitter")}
            value={userTwitter}
            onChange={e => setUserTwitter(e.currentTarget.value)}
            aria-label="Twitter username"
          />
        </div>
        {errors.twitter && <ErrorMessage message={errors.twitter.message} />}

        <div className="social-media-row">
          <Instagram className="yellow-icon" />
          <input
            type="text"
            placeholder="Your Instagram username"
            {...register("instagram")}
            value={userInstagram}
            onChange={e => setUserInstagram(e.currentTarget.value)}
            aria-label="Instagram username"
          />
        </div>
        {errors.instagram && <ErrorMessage message={errors.instagram.message} />}

        <div className="social-media-row">
          <Image
            src="/icons/tiktok_icon.svg"
            height={24}
            width={24}
            alt="Tiktok"
            style={{ overflow: "hidden" }}
          />
          <input
            type="text"
            placeholder="Your TikTok username"
            {...register("tiktok")}
            value={userTiktok}
            onChange={e => setUserTiktok(e.currentTarget.value)}
            aria-label="Tiktok username"
          />
        </div>
        {errors.tiktok && <ErrorMessage message={errors.tiktok.message} />}
      </div>
      <div className="submit-button">
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
