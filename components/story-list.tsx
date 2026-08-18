import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import type { Story } from "@/lib/content";

export function StoryList({ stories }: { stories: Story[] }) {
  return <div className="archive-list">{stories.map((story) =>
    <article key={story.id}>
      <Link href={`/news/${story.id}`}><img src={story.image} alt={story.title} /></Link>
      <div><span className="text-category">{story.category}</span><h2><Link href={`/news/${story.id}`}>{story.title}</Link></h2>{story.summary && <p>{story.summary}</p>}<div className="meta"><span><FontAwesomeIcon icon={faClock} /> {story.time}</span></div></div>
    </article>
  )}</div>;
}
