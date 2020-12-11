using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public static class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (context.Posts.Count() == 0)
            {
                List<Post> seedPosts = new List<Post>
                {
                    new Post() { Title = "First Post", Body = "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.", Image = "../client/src/components/Images/image1.jpeg" },
                    new Post() { Title = "This is my second post", Body = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.", Image = "../client/src/components/Images/image2.jpeg"},
                    new Post() { Title = "This is my third post", Body = "taque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", Image = "../client/src/components/Images/image3.jpeg"}
                };

                context.Posts.AddRange(seedPosts);

                context.SaveChanges();
            }
        }
    }
}