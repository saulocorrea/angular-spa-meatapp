// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Cors.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Shared.Middleware
{
    /// <summary>
    /// A middleware for handling CORS.
    /// </summary>
    public class CustomCorsMiddleware
    {
        private readonly Func<object, Task> OnResponseStartingDelegate = OnResponseStarting;
        private readonly RequestDelegate _next;
        private readonly CorsPolicy _policy;
        private readonly string _corsPolicyName;

        /// <summary>
        /// Instantiates a new <see cref="CustomCorsMiddleware"/>.
        /// </summary>
        /// <param name="next">The next middleware in the pipeline.</param>
        /// <param name="corsService">An instance of <see cref="ICorsService"/>.</param>
        /// <param name="loggerFactory">An instance of <see cref="ILoggerFactory"/>.</param>
        public CustomCorsMiddleware(
            RequestDelegate next,
            ICorsService corsService,
            ILoggerFactory loggerFactory)
            : this(next, corsService, loggerFactory, policyName: null)
        {
        }

        /// <summary>
        /// Instantiates a new <see cref="CustomCorsMiddleware"/>.
        /// </summary>
        /// <param name="next">The next middleware in the pipeline.</param>
        /// <param name="corsService">An instance of <see cref="ICorsService"/>.</param>
        /// <param name="loggerFactory">An instance of <see cref="ILoggerFactory"/>.</param>
        /// <param name="policyName">An optional name of the policy to be fetched.</param>
        public CustomCorsMiddleware(
            RequestDelegate next,
            ICorsService corsService,
            ILoggerFactory loggerFactory,
            string policyName)
        {
            if (loggerFactory == null)
            {
                throw new ArgumentNullException(nameof(loggerFactory));
            }

            _next = next ?? throw new ArgumentNullException(nameof(next));
            CorsService = corsService ?? throw new ArgumentNullException(nameof(corsService));
            _corsPolicyName = policyName;
            Logger = loggerFactory.CreateLogger<CustomCorsMiddleware>();
        }

        /// <summary>
        /// Instantiates a new <see cref="CustomCorsMiddleware"/>.
        /// </summary>
        /// <param name="next">The next middleware in the pipeline.</param>
        /// <param name="corsService">An instance of <see cref="ICorsService"/>.</param>
        /// <param name="policy">An instance of the <see cref="CorsPolicy"/> which can be applied.</param>
        /// <param name="loggerFactory">An instance of <see cref="ILoggerFactory"/>.</param>
        public CustomCorsMiddleware(
            RequestDelegate next,
            ICorsService corsService,
            CorsPolicy policy,
            ILoggerFactory loggerFactory)
        {
            if (loggerFactory == null)
            {
                throw new ArgumentNullException(nameof(loggerFactory));
            }

            _next = next ?? throw new ArgumentNullException(nameof(next));
            CorsService = corsService ?? throw new ArgumentNullException(nameof(corsService));
            _policy = policy ?? throw new ArgumentNullException(nameof(policy));
            Logger = loggerFactory.CreateLogger<CustomCorsMiddleware>();
        }

        private ICorsService CorsService { get; }

        private ILogger Logger { get; }

        /// <inheritdoc />
        public Task Invoke(HttpContext context, ICorsPolicyProvider corsPolicyProvider)
        {
            return !context.Request.Headers.ContainsKey(CorsConstants.Origin) ? _next(context) : InvokeCore(context, corsPolicyProvider);
        }

        private async Task InvokeCore(HttpContext context, ICorsPolicyProvider corsPolicyProvider)
        {
            var corsPolicy = _policy ?? await corsPolicyProvider.GetPolicyAsync(context, _corsPolicyName);
            if (corsPolicy == null)
            {
                //Logger?.NoCorsPolicyFound();
                await _next(context);
                return;
            }

            var corsResult = CorsService.EvaluatePolicy(context, corsPolicy);

            if (!corsResult.IsOriginAllowed)
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            if (corsResult.IsPreflightRequest)
            {
                CorsService.ApplyResult(corsResult, context.Response);

                // Since there is a policy which was identified,
                // always respond to preflight requests.
                context.Response.StatusCode = StatusCodes.Status204NoContent;
                return;
            }
            else
            {
                context.Response.OnStarting(OnResponseStartingDelegate, Tuple.Create(this, context, corsResult));
                await _next(context);
            }
        }

        private static Task OnResponseStarting(object state)
        {
            var (middleware, context, result) = (Tuple<CustomCorsMiddleware, HttpContext, CorsResult>)state;
            try
            {
                middleware.CorsService.ApplyResult(result, context.Response);
            }
            catch (Exception exception)
            {
                //middleware.Logger?.FailedToSetCorsHeaders(exception);
                throw exception;
            }
            return Task.CompletedTask;
        }
    }
}
