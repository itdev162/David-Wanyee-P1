using System;

namespace Domain
{
    public class ImageCollection
    {
        public Guid ID {get;set;}
        public Guid ImageID { get; set; }

        public string ImageName { get; set; }

        public string ImageType { get; set; }

        public DateTime Date { get; set; }

        public string ImageLength { get; set; }

        public string ImageURI{get; set;}

        public string Imagemetadata{get; set;}
    }
}