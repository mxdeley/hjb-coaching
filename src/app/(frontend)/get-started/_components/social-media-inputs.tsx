import React from 'react'

export type SocialMediaPlatform = 'instagram' | 'x' | 'facebook' | 'tiktok'

interface SocialMediaInputsProps {
  formData: Partial<Record<SocialMediaPlatform, string>>
  onChange: (platform: SocialMediaPlatform, value: string) => void
}

export const SocialMediaInputs: React.FC<SocialMediaInputsProps> = ({ formData, onChange }) => {
  const platforms: SocialMediaPlatform[] = ['instagram', 'x', 'facebook', 'tiktok']

  return (
    <div className="space-y-2">
      {platforms.map((platform) => (
        <div key={platform}>
          <label htmlFor={platform} className="block text-sm font-medium text-gray-400">
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </label>
          <input
            id={platform}
            type="text"
            value={formData[platform] || ''}
            onChange={(e) => onChange(platform, e.target.value)}
            placeholder={`Enter your ${platform} handle`}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>
      ))}
    </div>
  )
}
