using AutoMapper;
using Domain;

namespace Application.Core
{
    public class ProfileMapper : Profile
    {
        public ProfileMapper()
        {
            CreateMap<Activity , Activity>();
        }
    }
}