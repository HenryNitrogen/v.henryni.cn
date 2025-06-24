INSERT INTO Video (
  id,
  title,
  description,
  videoUrl,
  thumbnailUrl,
  createdAt
) VALUES (
  'ckz9n1a0d000001l2ez8c1fjs', -- 随便写一个 cuid 字符串
  'My First Video',
  'This is a test video',
  'https://example.com/video.mp4',
  'https://example.com/thumbnail.jpg',
  NOW()
);
