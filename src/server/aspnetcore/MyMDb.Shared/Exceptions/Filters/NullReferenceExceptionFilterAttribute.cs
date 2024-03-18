namespace MyMDb.Shared.Exceptions.Filters;

public class NullReferenceExceptionFilterAttribute : ExceptionFilterAttribute
{
    private const string ExceptionKey = "NullReference";

    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is NullReferenceException exception)
        {
            context.ExceptionHandled = true;
            context.Result = new JsonResult(new ExceptionFilterContextResult
            {
                Key = ExceptionKey,
                Message = exception.Message
            })
            {
                StatusCode = (int)HttpStatusCode.BadRequest
            };
        }
    }
}
