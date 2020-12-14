using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
        public static class ImageList
        {

            public class Query : IRequest<List<ImageCollection>> { }

            public class Handler : IRequestHandler<Query, List<ImageCollection>>
            {
                private readonly DataContext context;

                public Handler(DataContext context) => this.context = context;

                public Task<List<ImageCollection>> Handle(Query request, CancellationToken cancellationToken)
                {
                    return this.context.ImageCollections.ToListAsync();
                }

            }

        }
}
    
