using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Posts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ImageController : ControllerBase
    {
        private readonly IMediator mediator1;
        private readonly DataContext context1;

        public ImageController(IMediator mediator1, DataContext context1)
        {
            this.mediator1= mediator1;
            this.context1 = context1;
        }

        public async Task<ActionResult<List<ImageCollection>>> List()
        {
            return await this.mediator1.Send(new ImageList.Query());
        }

        /// <summary>
        /// GET api/posts
        /// </summary>
        /// <returns>A list of posts</returns>
        [HttpGet]
        public ActionResult<List<ImageCollection>> Get()
        {
            return this.context1.ImageCollections.ToList();
        }

        /// <summary>
        /// GET api/post/[id]
        /// </summary>
        /// <param name= "id">Post id</param>
        /// <returns>A single post</returns>
        [HttpGet("{id}")]

        public ActionResult<ImageCollection> GetById(Guid id)
        {
            return this.context1.ImageCollections.Find(id);
        }

        /// <summary>
        ///POST api/post 
        /// </summary>
        ///<param name = "request">JSON request containing post fields</param>
        ///<returns>A new post </returns>
        [HttpPost]

        public ActionResult<ImageCollection> Create([FromBody] ImageCollection request)
        {
            var imagedata = new ImageCollection
            {
                ImageID = request.ImageID,
                ImageName = request.ImageName,
                ImageType = request.ImageType,
                ImageLength = request.ImageLength,
                Imagemetadata = request.Imagemetadata,
                ImageURI = request.ImageURI,
                Date = request.Date
            };

            context1.ImageCollections.Add(imagedata);
            var success = context1.SaveChanges() > 0;

            if (success)
            {
                return imagedata;
            }

            throw new Exception("Error creating image data");
        }

        ///<summary>
        /// PUT api/put
        /// </summary>
        /// <param> name = "request"> JSON request containing one or more updated post fields</param>            /// <returns>An updated post</returns>
        [HttpPut]

        public ActionResult<ImageCollection> Update([FromBody] ImageCollection request)
        {
            var imagedata = context1.ImageCollections.Find(request.ImageID);

            if (imagedata == null)
            {
                throw new Exception("Could not find post");
            }

            //update the post properties with request values, if present
            imagedata.ImageName = request.ImageName != null ? request.ImageName : imagedata.ImageName;
            imagedata.ImageType = request.ImageType != null ? request.ImageType : imagedata.ImageType;
            imagedata.ImageLength = request.ImageLength != null ? request.ImageLength : imagedata.ImageLength;
            imagedata.Imagemetadata = request.Imagemetadata != null ? request.Imagemetadata:imagedata.Imagemetadata;
            imagedata.Date = request.Date != null ? request.Date : imagedata.Date;

            var success = context1.SaveChanges() > 0;

            if (success)
            {
                return imagedata;
            }

            throw new Exception("Error updating image data");
        }

        /// <summary>
        ///DELETE api/post/[id] 
        /// </summary>
        ///<param name="id">imagedata id</param>
        ///<returns>True, if successful</returns>
        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(Guid id)
        {
            var imagedata = context1.ImageCollections.Find(id);

            if (imagedata == null)
            {
                throw new Exception("Could not find post");
            }

            context1.Remove(imagedata);

            var success = context1.SaveChanges() > 0;

            if (success)
            {
                return true;
            }

            throw new Exception("Error deleting imagedata");
        }
    }
}