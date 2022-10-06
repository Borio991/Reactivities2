using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extentions
{
    public static class ApplicationServicesExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services , IConfiguration _config)
        {
               services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", opt => 
                {
                    opt.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://127.0.0.1:5173");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(ProfileMapper).Assembly);
            return services;
        }
    }
}