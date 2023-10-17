import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { options } from '../auth/[...nextauth]';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  console.log(req.body)
  const { title, content } = req.body;
  let t = req.body.title;

  const session = await getServerSession(req, res, options);
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}