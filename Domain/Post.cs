using System;

namespace Domain
{
    public class Post
    {
        public Guid ID{get;set;}

        public string Title { get; set; }

        public string Body{get;set;}

        public DateTime Date { get; set; }

        public string Image {get; set;} 
    }
}